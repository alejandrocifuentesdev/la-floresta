package com.lafloresta.backend.professional.dto;

import com.lafloresta.backend.professional.ProfessionalCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfessionalRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    @NotNull(message = "La categoría es obligatoria")
    private ProfessionalCategory category;

    private String phone;
    private String email;
    private String website;
    private String imageUrl;
}
