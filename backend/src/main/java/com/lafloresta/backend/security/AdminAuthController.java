package com.lafloresta.backend.security;

import java.util.Map;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminAuthController {
    @GetMapping("/api/admin/auth")
    public Map<String, Boolean> auth(Authentication authentication) {
        return Map.of("authenticated", authentication != null
                && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken));
    }
}
