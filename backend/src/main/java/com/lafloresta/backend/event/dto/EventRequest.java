package com.lafloresta.backend.event.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EventRequest {

        @NotBlank(message = "El título es obligatorio")
        private String title;

        @NotBlank(message = "La descripción es obligatoria")
        private String description;

        @NotNull(message = "La fecha es obligatoria")
        private LocalDate date;

        @NotBlank(message = "La ubicación es obligatoria")
        private String location;

        private String imageUrl;
}
