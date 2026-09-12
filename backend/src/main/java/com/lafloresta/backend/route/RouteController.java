package com.lafloresta.backend.route;

import com.lafloresta.backend.route.dto.RouteRequest;
import com.lafloresta.backend.route.dto.RouteResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping
    public List<RouteResponse> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/{id}")
    public RouteResponse getRouteById(@PathVariable Long id) {
        return routeService.getRouteById(id);
    }

    @GetMapping("/difficulty/{difficulty}")
    public List<RouteResponse> getRoutesByDifficulty(
            @PathVariable RouteDifficulty difficulty) {

        return routeService.getRoutesByDifficulty(difficulty);
    }

    @PostMapping
    public RouteResponse createRoute(@Valid @RequestBody RouteRequest request) {
        return routeService.createRoute(request);
    }

    @PutMapping("/{id}")
    public RouteResponse updateRoute(
            @PathVariable Long id,
            @Valid @RequestBody RouteRequest request) {

        return routeService.updateRoute(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
    }
}
