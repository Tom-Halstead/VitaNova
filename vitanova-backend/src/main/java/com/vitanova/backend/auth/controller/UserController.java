package com.vitanova.backend.auth.controller;

import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

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
        String name  = principal.getAttribute("given_name");

        return userService.findOrCreateByCognitoUuidAndProfile(sub, email, name);
    }


    @DeleteMapping("/me")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMe(@AuthenticationPrincipal OAuth2User principal, HttpServletRequest request, HttpServletResponse response) {

        request.getSession().invalidate();
        Cookie cookie = new Cookie("JSESSIONID", "");
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        userService.deleteByCognitoUuid(principal.getAttribute("sub"));
    }


    @PatchMapping("/me")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateMe(@AuthenticationPrincipal OAuth2User principal) {
       userService.findOrCreateByCognitoUuidAndProfile(principal.getAttribute("sub"), principal.getAttribute("email"), principal.getAttribute("given_name"));
    }


}
