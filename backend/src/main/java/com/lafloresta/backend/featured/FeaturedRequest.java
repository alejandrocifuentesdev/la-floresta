package com.lafloresta.backend.featured;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeaturedRequest {
    @NotNull(message = "El estado destacado es obligatorio")
    private Boolean featured;
}
