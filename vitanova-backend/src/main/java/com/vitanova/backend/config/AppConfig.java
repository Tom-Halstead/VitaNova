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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class AppConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1) CORS for React dev server
//                .cors(Customizer.withDefaults())
                // 2) Stateless, no CSRF (we’re using JWTs + OAuth2 redirects)
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 3) Public vs Protected
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/health", "/static/**").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        // Allow the SPA shell
                        .requestMatchers("/dashboard", "/dashboard/**").permitAll()
                        // Protect all API calls
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().denyAll()
                )

                // 4) JWT‐based Resource Server for API
                .oauth2ResourceServer(rs -> rs
                        .jwt(Customizer.withDefaults())
                )

                // 5) OAuth2 login → Cognito, then back here
                .oauth2Login(login -> login
                        .loginPage("/oauth2/authorization/cognito")          // kickoff
                        .defaultSuccessUrl("/dashboard", /* alwaysUse */ true) // after login, go to SPA
                );

        return http.build();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.setAllowedOrigins(List.of("http://localhost:3000"));
//        config.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
//        config.setAllowedHeaders(List.of("*"));
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/api/**", config);
//        return source;
//    }
    }
