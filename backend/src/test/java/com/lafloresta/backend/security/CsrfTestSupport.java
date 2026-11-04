package com.lafloresta.backend.security;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

final class CsrfTestSupport {
    private CsrfTestSupport() {}

    // Usar cookies reales de Spring, sin simular ni omitir el filtro CSRF.
    static RequestPostProcessor csrf(MockMvc mvc) throws Exception {
        var result = mvc.perform(get("/api/admin/auth")).andExpect(status().isOk()).andReturn();
        var cookie = result.getResponse().getCookie("XSRF-TOKEN");
        assertNotNull(cookie);
        assertFalse(cookie.isHttpOnly());
        assertFalse(cookie.getValue().isBlank());
        return request -> {
            request.setCookies(cookie);
            request.addHeader("X-XSRF-TOKEN", cookie.getValue());
            return request;
        };
    }
}
