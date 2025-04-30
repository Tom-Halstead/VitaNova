package com.vitanova.backend.auth.controller;

import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.model.User;
import com.vitanova.backend.auth.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
    public UserDTO me(@AuthenticationPrincipal Jwt jwt) {
        String cognitoUuid = jwt.getClaim("sub");

        return userService.findOrCreateByCognitoUuid(cognitoUuid);

    }
}
