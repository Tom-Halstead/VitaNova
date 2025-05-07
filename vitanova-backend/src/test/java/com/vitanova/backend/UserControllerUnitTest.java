package com.vitanova.backend;


import com.vitanova.backend.auth.controller.UserController;
import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.service.UserService;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;


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



    private Principal fakePrincipal() {
        Map<String, Object> userAttributes = Map.of(
                "sub", "cognito-123",
                "email", "example@example.com",
                "name", "Alice"
                );
        return new DefaultOAuth2User(
                List.of(new SimpleGrantedAuthority("ROLE_USER")),
                userAttributes,
                "sub"
        );
    }

    @Test
    void me_ReturnsUserDto_andStatus200() throws Exception {
        // given
        UserDTO dto = new UserDTO( "example@example.com", "Alice");
        given(userService.findOrCreateByCognitoUuidAndProfile(
                "cognito-123", "example@example.com", "Alice"))
                .willReturn(dto);

        // when / then
        mvc.perform(get("/api/users/me")
                        .principal(fakePrincipal())
                        .header("Origin", "http://localhost:3000"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Alice"))
                .andExpect(jsonPath("$.email").value("example@example.com"))
                .andExpect(header()
                        .string("Access-Control-Allow-Credentials", "true"))
                .andExpect(header()
                        .string("Access-Control-Allow-Origin", "http://localhost:3000"));

        then(userService)
                .should().findOrCreateByCognitoUuidAndProfile(
                        "cognito-123", "alice@example.com", "Alice");
    }

    @Test
    void deleteMe_InvalidatesSession_andReturns204() throws Exception {
        mvc.perform(delete("/api/users/me")
                        .principal(fakePrincipal())
                        .sessionAttr("JSESSIONID", "some-session-id")
                        .header("Origin", "http://localhost:3000"))
                .andExpect(status().isNoContent())
                .andExpect(cookie().maxAge("JSESSIONID", 0))
                .andExpect(cookie().value("JSESSIONID", ""));

        then(userService).should()
                .deleteByCognitoUuid("cognito-123");
    }



}
