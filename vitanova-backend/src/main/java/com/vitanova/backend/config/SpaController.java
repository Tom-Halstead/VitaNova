package com.vitanova.backend.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({
            "/dashboard",
            "/dashboard/**",
            "/new-entry",
            "/new-entry/**",
            "/entries",
            "/entries/**",
            "/insights-goals",
            "/insights-goals/**",
            "/settings",
            "/settings/**"
    })
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
