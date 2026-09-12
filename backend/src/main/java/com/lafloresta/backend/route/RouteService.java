package com.lafloresta.backend.route;

import com.lafloresta.backend.route.dto.RouteRequest;
import com.lafloresta.backend.route.dto.RouteResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<RouteResponse> getAllRoutes() {

        List<Route> routes = routeRepository.findAll();
        List<RouteResponse> responses = new ArrayList<>();

        for (Route route : routes) {
            responses.add(toResponse(route));
        }

        return responses;
    }

    public RouteResponse getRouteById(Long id) {

        Route route = getRouteEntityById(id);

        return toResponse(route);
    }

    public List<RouteResponse> getRoutesByDifficulty(RouteDifficulty difficulty) {

        List<Route> routes = routeRepository.findByDifficulty(difficulty);
        List<RouteResponse> responses = new ArrayList<>();

        for (Route route : routes) {
            responses.add(toResponse(route));
        }

        return responses;
    }

    public RouteResponse createRoute(RouteRequest request) {

        Route route = new Route();

        updateRouteFromRequest(route, request);

        Route savedRoute = routeRepository.save(route);

        return toResponse(savedRoute);
    }

    public RouteResponse updateRoute(Long id, RouteRequest request) {

        Route route = getRouteEntityById(id);

        updateRouteFromRequest(route, request);

        Route savedRoute = routeRepository.save(route);

        return toResponse(savedRoute);
    }

    public void deleteRoute(Long id) {

        Route route = getRouteEntityById(id);

        routeRepository.delete(route);
    }

    private Route getRouteEntityById(Long id) {

        return routeRepository.findById(id)
                .orElseThrow(() -> new RouteNotFoundException(id));
    }

    private void updateRouteFromRequest(Route route, RouteRequest request) {

        route.setName(request.getName());
        route.setDescription(request.getDescription());
        route.setDistanceKm(request.getDistanceKm());
        route.setDurationMinutes(request.getDurationMinutes());
        route.setDifficulty(request.getDifficulty());
        route.setStartLocation(request.getStartLocation());
        route.setImageUrl(request.getImageUrl());
    }

    private RouteResponse toResponse(Route route) {

        return new RouteResponse(
                route.getId(),
                route.getName(),
                route.getDescription(),
                route.getDistanceKm(),
                route.getDurationMinutes(),
                route.getDifficulty(),
                route.getStartLocation(),
                route.getImageUrl()
        );
    }
}
