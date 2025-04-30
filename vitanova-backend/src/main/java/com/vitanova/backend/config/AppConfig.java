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
    public CorsConfigurationSource corsConfigurationSource() {
        var config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1) CORS for React dev server
//                .cors(Customizer.withDefaults())
                // 2) Stateless, no CSRF (we’re using JWTs + OAuth2 redirects)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )

                // 3) Public vs Protected
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/health", "/static/**").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()                   // /oauth2/authorization/cognito
                        .requestMatchers("/login/oauth2/**").permitAll()             // /login/oauth2/code/cognito callback
                        // your APIs
                        .requestMatchers("/api/**").authenticated()
                        // everything else you want blocked
                        .anyRequest().denyAll()
                )

                .oauth2Login(login -> login
                        .loginPage("/oauth2/authorization/cognito")
                        // **AFTER** Cognito callback and token exchange, send user to React:
                        .defaultSuccessUrl("http://localhost:3000/dashboard", true)
                        // On error, send back to your React home page
                        .failureUrl("http://localhost:3000/")
                )
                .oauth2ResourceServer(rs -> rs.jwt(Customizer.withDefaults()));
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
