package com.lafloresta.backend.route.dto;

import com.lafloresta.backend.route.RouteDifficulty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RouteRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    @NotNull(message = "La distancia es obligatoria")
    @Positive(message = "La distancia debe ser un valor positivo")
    private Double distanceKm;

    @NotNull(message = "La duración es obligatoria")
    @Positive(message = "La duración debe ser un valor positivo")
    private Integer durationMinutes;

    @NotNull(message = "La dificultad es obligatoria")
    private RouteDifficulty difficulty;

    @NotBlank(message = "La ubicación inicial es obligatoria")
    private String startLocation;

    private String imageUrl;
}
