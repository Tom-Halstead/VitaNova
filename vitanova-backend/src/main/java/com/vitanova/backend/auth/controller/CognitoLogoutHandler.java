package com.vitanova.backend.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;

@Component
public class CognitoLogoutHandler extends SimpleUrlLogoutSuccessHandler {

    @Value("${app.cognito.domain}")
    private String domain;   // e.g. https://YOUR_POOL_DOMAIN.auth.us-east-2.amazoncognito.com

    @Value("${spring.security.oauth2.client.registration.cognito.client-id}")
    private String clientId;

    // Now points at your Home route
    @Value("${app.logout-redirect-url}")
    private String logoutRedirectUrl; // http://localhost:8080/

    @Override
    protected String determineTargetUrl(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) {
        return UriComponentsBuilder
                .fromHttpUrl(domain + "/logout")
                .queryParam("client_id", clientId)
                .queryParam("logout_uri", logoutRedirectUrl)
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUriString();
    }
}
