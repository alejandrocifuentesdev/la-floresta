package com.lafloresta.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.ObjectMapper;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@Transactional
class AdminCrudIntegrationTests {
    @Autowired WebApplicationContext context;
    @Autowired FilterChainProxy security;
    @Autowired ObjectMapper mapper;
    @Value("${ADMIN_USERNAME}") String username;
    @Value("${ADMIN_PASSWORD}") String password;

    @Test
    void authenticatedCrudForAllEntitiesAndPublicReads() throws Exception {
        var mvc = MockMvcBuilders.webAppContextSetup(context).addFilters(security).build();
        var login = mvc.perform(post("/api/admin/login").param("username", username).param("password", password))
                .andExpect(status().isOk()).andReturn();
        var session = (MockHttpSession) login.getRequest().getSession(false);
        String[][] cases = {
            {"/api/events", "title", """
                {"title":"Session test","description":"Temporary test","date":"2030-01-01","location":"Test"}
                """},
            {"/api/businesses", "name", """
                {"name":"Session test","description":"Temporary test","category":"SHOP","address":"Test"}
                """},
            {"/api/points-of-interest", "name", """
                {"name":"Session test","description":"Temporary test","category":"PARK","address":"Test","latitude":41.4,"longitude":2.0}
                """},
            {"/api/routes", "name", """
                {"name":"Session test","description":"Temporary test","distanceKm":2.0,"durationMinutes":30,"difficulty":"EASY","startLocation":"Test"}
                """}
        };

        for (String[] test : cases) {
            String endpoint = test[0];
            mvc.perform(get(endpoint)).andExpect(status().isOk());
            var created = mvc.perform(post(endpoint).session(session)
                            .contentType("application/json").content(test[2]))
                    .andExpect(status().isOk())
                    .andExpect(header().doesNotExist("WWW-Authenticate")).andReturn();
            long id = mapper.readTree(created.getResponse().getContentAsString()).get("id").asLong();
            assertTrue(id > 0);
            String item = endpoint + "/" + id;
            mvc.perform(get(item)).andExpect(status().isOk())
                    .andExpect(jsonPath("$." + test[1]).value("Session test"));
            mvc.perform(put(item).session(session).contentType("application/json")
                            .content(test[2].replace("Session test", "Updated session test")))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$." + test[1]).value("Updated session test"));
            mvc.perform(get(item)).andExpect(status().isOk())
                    .andExpect(jsonPath("$." + test[1]).value("Updated session test"));
            mvc.perform(delete(item).session(session)).andExpect(status().isOk());
            mvc.perform(get(item)).andExpect(status().isNotFound());
        }
    }
}
