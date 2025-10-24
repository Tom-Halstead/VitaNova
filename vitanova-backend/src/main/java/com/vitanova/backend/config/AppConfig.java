package com.vitanova.backend.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        // Only explicit origins when sending cookies (no "*")
        cfg.setAllowedOrigins(List.of(
                "https://vitanova-app.com",
                "http://localhost:3000"
        ));
        cfg.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(List.of("Authorization","Content-Type","Accept","Origin","X-Requested-With"));
        cfg.setAllowCredentials(true);      // required for cookies
        cfg.setMaxAge(3600L);               // cache preflight for 1h

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
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
                                "/logout/**",
                                "/actuator",
                                "/actuator/health/**"
                        ).permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()       // SPA paths → forward to index.html
                )

                .oauth2Login(login -> login
                        .loginPage("/oauth2/authorization/cognito")
                                .defaultSuccessUrl("https://vitanova-app.com/dashboard", true)
                                .failureHandler((req, res, ex) -> {
                            String reason = (ex.getCause() != null) ? ex.getCause().getMessage() : ex.getMessage();
                            String msg = URLEncoder.encode(reason, StandardCharsets.UTF_8);
                            res.sendRedirect("https://vitanova-app.com/?oauth2_error=" + "Couldn't login :  " + msg);
                        })
                )


                // Local logout + Hosted-UI logout
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .addLogoutHandler(new SecurityContextLogoutHandler()) // clear Spring session
//                        .logoutSuccessHandler(cognitoLogoutHandler)           // redirect to Cognito /logout
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                                .logoutSuccessUrl("https://vitanova-app.com")
                )

        // NOTE: resource-server (JWT) disabled in dev; re-enable for prod.
                .oauth2ResourceServer(rs -> rs.jwt(Customizer.withDefaults()));

        return http.build();
    }


    }
