package com.vitanova.backend;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Map;

import com.vitanova.backend.auth.controller.UserController;
import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.service.UserService;

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

    /**
     * Create a fake OAuth2User to drive the security filter chain.
     */
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

    @Test
    void me_ReturnsUserDto_andStatus200() throws Exception {
        // given: stub service return
        UserDTO dto = new UserDTO("example@example.com", "Alice");
        given(userService.findOrCreateByCognitoUuidAndProfile(
                "cognito-123",
                "example@example.com",
                "Alice"
        )).willReturn(dto);

        // when / then
        mvc.perform(get("/api/users/me")
                        .with(oauth2Login().oauth2User(fakeOAuth2User()))
                        .header("Origin", "http://localhost:3000"))
                .andExpect(status().isOk());

        then(userService).should()
                .findOrCreateByCognitoUuidAndProfile(
                        "cognito-123","example@example.com","Alice");

    }

    @Test
    void deleteMe_InvalidatesSession_andReturns204() throws Exception {
        // no stub needed: deleteMe only calls deleteByCognitoUuid
        mvc.perform(delete("/api/users/me")
                        .with(oauth2Login().oauth2User(fakeOAuth2User()))
                        .with(csrf())
                        .header("Origin", "http://localhost:3000"))
                .andExpect(status().isNoContent())
                .andExpect(cookie().maxAge("JSESSIONID", 0))
                .andExpect(cookie().value("JSESSIONID", ""));

        // verify service delete
        then(userService).should()
                .deleteByCognitoUuid("cognito-123");
    }
}
