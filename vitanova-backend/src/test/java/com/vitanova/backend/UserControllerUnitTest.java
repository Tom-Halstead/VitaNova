package com.vitanova.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Map;

import com.vitanova.backend.auth.controller.UserController;
import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.service.UserService;

import com.vitanova.backend.exceptions.UserNotFoundException;
import com.vitanova.backend.exceptions.UserServiceException;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;


@WebMvcTest(UserController.class)
public class UserControllerUnitTest {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private UserService userService;

    private DefaultOAuth2User fakeOAuth2User() {
        Map<String, Object> attrs = Map.of(
                "sub",   "cognito-123",
                "email", "example@example.com",
                "name",  "Alice"
        );
        return new DefaultOAuth2User(
                List.of(new SimpleGrantedAuthority("ROLE_USER")),
                attrs,
                "sub"
        );
    }

    // --- GET /me happy path ---
    @Test
    void me_ReturnsUserDto_andStatus200() throws Exception {
        UserDTO dto = new UserDTO("example@example.com", "Alice");
        given(userService.findOrCreateByCognitoUuidAndProfile(
                "cognito-123", "example@example.com", "Alice"
        )).willReturn(dto);

        mvc.perform(get("/api/users/me")
                        .with(oauth2Login().oauth2User(fakeOAuth2User()))
                        .header("Origin", "http://localhost:3000"))
                .andExpect(status().isOk());

    }

    // --- GET /me → IllegalArgumentException should bubble up as ServletException ---
    @Test
    void me_WhenServiceThrowsIllegalArgument_ThrowsIllegalArgumentException() throws Exception {
        given(userService.findOrCreateByCognitoUuidAndProfile(
                anyString(), anyString(), anyString()
        )).willThrow(new IllegalArgumentException("invalid input"));

        ServletException ex = assertThrows(
                ServletException.class,
                () -> mvc.perform(get("/api/users/me")
                                .with(oauth2Login().oauth2User(fakeOAuth2User())))
                        .andReturn(),
                "Expected ServletException when service throws IllegalArgumentException"
        );
        assertInstanceOf(IllegalArgumentException.class, ex.getCause(),
                "Cause should be IllegalArgumentException");
        assertEquals("invalid input", ex.getCause().getMessage(),
                "Exception message should match");

    }

    // --- GET /me → UserServiceException should bubble up as ServletException ---
    @Test
    void me_WhenServiceThrowsUserServiceException_ThrowsUserServiceException() throws Exception {
        given(userService.findOrCreateByCognitoUuidAndProfile(
                anyString(), anyString(), anyString()
        )).willThrow(new UserServiceException("database down", new RuntimeException()));

        ServletException ex = assertThrows(
                ServletException.class,
                () -> mvc.perform(get("/api/users/me")
                                .with(oauth2Login().oauth2User(fakeOAuth2User())))
                        .andReturn(),
                "Expected ServletException when service throws UserServiceException"
        );
        assertInstanceOf(UserServiceException.class, ex.getCause(),
                "Cause should be UserServiceException");
        assertEquals("database down", ex.getCause().getMessage(),
                "Exception message should match");

    }

    // --- DELETE /me happy path ---
    @Test
    void deleteMe_InvalidatesSession_andReturns204() throws Exception {
        mvc.perform(delete("/api/users/me")
                        .with(oauth2Login().oauth2User(fakeOAuth2User()))
                        .with(csrf())
                        .header("Origin", "http://localhost:3000"))
                .andExpect(status().isNoContent())
                .andExpect(cookie().maxAge("JSESSIONID", 0))
                .andExpect(cookie().value("JSESSIONID", ""));

    }

    // --- DELETE /me → UserNotFoundException → 404 Not Found ---
    @Test
    void deleteMe_WhenUserNotFound_Returns404() throws Exception {
        willThrow(new UserNotFoundException("no such user"))
                .given(userService).deleteByCognitoUuid("cognito-123");

        mvc.perform(delete("/api/users/me")
                        .with(oauth2Login().oauth2User(fakeOAuth2User()))
                        .with(csrf()))
                .andExpect(status().isNotFound());

    }

    // --- DELETE /me → UserServiceException should bubble up as ServletException ---
    @Test
    void deleteMe_WhenServiceException_ThrowsUserServiceException() throws Exception {
        willThrow(new UserServiceException("db error", new RuntimeException()))
                .given(userService).deleteByCognitoUuid("cognito-123");

        ServletException ex = assertThrows(
                ServletException.class,
                () -> mvc.perform(delete("/api/users/me")
                                .with(oauth2Login().oauth2User(fakeOAuth2User()))
                                .with(csrf()))
                        .andReturn(),
                "Expected ServletException when service throws UserServiceException"
        );
        assertInstanceOf(UserServiceException.class, ex.getCause(),
                "Cause should be UserServiceException");
        assertEquals("db error", ex.getCause().getMessage(),
                "Exception message should match");

    }
}