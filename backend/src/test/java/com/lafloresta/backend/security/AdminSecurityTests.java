package com.lafloresta.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringJUnitWebConfig(AdminSecurityTests.Config.class)
@TestPropertySource(properties = {"ADMIN_USERNAME=test-admin", "ADMIN_PASSWORD=test-password"})
class AdminSecurityTests {
    @TestConfiguration
    @EnableWebMvc
    @EnableWebSecurity
    @Import({SecurityConfig.class, AdminAuthController.class, TestApi.class})
    static class Config {}

    // Endpoints de prueba: verifican los filtros sin modificar datos reales.
    @RestController
    static class TestApi {
        @RequestMapping(value = {"/api/events", "/api/businesses", "/api/points-of-interest", "/api/routes"},
                method = {RequestMethod.GET, RequestMethod.POST})
        String collection() { return "ok"; }

        @RequestMapping(value = {"/api/events/1", "/api/businesses/1", "/api/points-of-interest/1", "/api/routes/1"},
                method = {RequestMethod.PUT, RequestMethod.DELETE})
        String item() { return "ok"; }
    }

    @Autowired WebApplicationContext context;
    @Autowired FilterChainProxy security;
    MockMvc mvc;
    String[] endpoints = {"/api/events", "/api/businesses", "/api/points-of-interest", "/api/routes"};

    @BeforeEach
    void setup() {
        mvc = MockMvcBuilders.webAppContextSetup(context).addFilters(security).build();
    }

    @Test
    void publicReadsAndAnonymousWrites() throws Exception {
        mvc.perform(get("/api/admin/auth"))
                .andExpect(status().isOk()).andExpect(content().json("{\"authenticated\":false}"));
        for (String endpoint : endpoints) {
            mvc.perform(get(endpoint)).andExpect(status().isOk());
            mvc.perform(post(endpoint)).andExpect(status().isUnauthorized())
                    .andExpect(header().doesNotExist("WWW-Authenticate"))
                    .andExpect(header().doesNotExist("Location"));
            mvc.perform(put(endpoint + "/1")).andExpect(status().isUnauthorized());
            mvc.perform(delete(endpoint + "/1")).andExpect(status().isUnauthorized());
        }
    }

    @Test
    void wrongPasswordDoesNotAuthenticate() throws Exception {
        mvc.perform(post("/api/admin/login").param("username", "test-admin").param("password", "wrong"))
                .andExpect(status().isUnauthorized())
                .andExpect(header().doesNotExist("Location"))
                .andExpect(header().doesNotExist("WWW-Authenticate"));
    }

    @Test
    void sessionAllowsWritesAndLogoutInvalidatesIt() throws Exception {
        var result = mvc.perform(post("/api/admin/login")
                        .param("username", "test-admin").param("password", "test-password"))
                .andExpect(status().isOk()).andExpect(header().doesNotExist("Location")).andReturn();
        var session = (MockHttpSession) result.getRequest().getSession(false);
        assertNotNull(session);
        mvc.perform(get("/api/admin/auth").session(session))
                .andExpect(content().json("{\"authenticated\":true}"));
        for (String endpoint : endpoints) {
            mvc.perform(post(endpoint).session(session)).andExpect(status().isOk());
            mvc.perform(put(endpoint + "/1").session(session)).andExpect(status().isOk());
            mvc.perform(delete(endpoint + "/1").session(session)).andExpect(status().isOk());
        }
        mvc.perform(post("/api/admin/logout").servletPath("/api/admin/logout").session(session))
                .andExpect(status().isOk()).andExpect(header().doesNotExist("Location"))
                .andExpect(cookie().maxAge("JSESSIONID", 0));
        assertTrue(session.isInvalid());
        mvc.perform(get("/api/admin/auth"))
                .andExpect(content().json("{\"authenticated\":false}"));
        mvc.perform(post("/api/events")).andExpect(status().isUnauthorized());
    }
}
