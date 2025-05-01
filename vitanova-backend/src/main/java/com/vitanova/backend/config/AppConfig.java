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


@Configuration
@EnableWebSecurity
public class AppConfig {


    /**
     * Inject your custom CognitoLogoutHandler bean.
     * Assume it’s already annotated @Component (or define it here as a @Bean).
     */
    private final CognitoLogoutHandler cognitoLogoutHandler;

    public AppConfig(CognitoLogoutHandler cognitoLogoutHandler) {
        this.cognitoLogoutHandler = cognitoLogoutHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/health","/static/**","/oauth2/**","/login/oauth2/**","/logout").permitAll()
                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().permitAll()
                )
                .oauth2Login(login -> login
                        .loginPage("/oauth2/authorization/cognito")
                        .defaultSuccessUrl("http://localhost:3000/dashboard", true)
                        .failureUrl("/")
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")

                        // 1) Clear the local Authentication & session:
                        .addLogoutHandler(new SecurityContextLogoutHandler())

                        // 2) Then redirect into Cognito’s logout endpoint:
                        .logoutSuccessHandler(cognitoLogoutHandler)

                        // (Optional) ensure session cookie is removed locally:
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                )
                .oauth2ResourceServer(rs -> rs.jwt(Customizer.withDefaults()));

        return http.build();
    }

    }
