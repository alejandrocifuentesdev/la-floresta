package com.lafloresta.backend.route.dto;

import com.lafloresta.backend.route.RouteDifficulty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RouteResponse {

    private Long id;
    private String name;
    private String description;
    private Double distanceKm;
    private Integer durationMinutes;
    private RouteDifficulty difficulty;
    private String startLocation;
    private String imageUrl;
}
