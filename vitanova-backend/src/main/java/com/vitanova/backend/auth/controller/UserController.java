package com.vitanova.backend.auth.controller;

import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.model.User;
import com.vitanova.backend.auth.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public UserDTO me(@AuthenticationPrincipal OAuth2User principal) {
        String sub   = principal.getAttribute("sub");
        String email = principal.getAttribute("email");
        String name  = principal.getAttribute("name");
        return userService.findOrCreateByCognitoUuidAndProfile(sub, email, name);
    }
}
