package com.vitanova.backend.config;


import com.vitanova.backend.auth.controller.CognitoLogoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;


@Configuration
@EnableWebSecurity
public class AppConfig {


    private final CognitoLogoutHandler cognitoLogoutHandler;

    public AppConfig(CognitoLogoutHandler cognitoLogoutHandler) {
        this.cognitoLogoutHandler = cognitoLogoutHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Allow the React dev server (3000) to hit /api/**
                .cors(Customizer.withDefaults())

                // CSRF off for stateless API + OAuth2 redirects
                .csrf(AbstractHttpConfigurer::disable)

                // Let Spring create a session just for the OAuth2 handshake
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))

                // Routes
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/health",
                                "/static/**",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/logout"
                        ).permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()       // SPA paths → forward to index.html
                )

                // OAuth2 code-flow login via Cognito
//                .oauth2Login(login -> login
//                        .loginPage("/oauth2/authorization/cognito")
//                        // after code exchange, send user back to CRA dev server
//                        .defaultSuccessUrl("http://localhost:3000/dashboard", true)
//                        .failureUrl("http://localhost:3000/")
//                )
                .oauth2Login(login -> login
                        .loginPage("/oauth2/authorization/cognito")
                        .defaultSuccessUrl("http://localhost:3000/dashboard", true)
                        .failureHandler((req, res, ex) -> {
                            ex.printStackTrace();  // logs the full stacktrace
                            String msg = URLEncoder.encode(ex.getMessage(), StandardCharsets.UTF_8);
                            res.sendRedirect("http://localhost:3000/?oauth2_error=" + msg);
                        })
                )


                // Local logout + Hosted-UI logout
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .addLogoutHandler(new SecurityContextLogoutHandler()) // clear Spring session
                        .logoutSuccessHandler(cognitoLogoutHandler)           // redirect to Cognito /logout
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                )

        // NOTE: resource-server (JWT) disabled in dev; re-enable for prod.
                .oauth2ResourceServer(rs -> rs.jwt(Customizer.withDefaults()));

        return http.build();
    }


    }
