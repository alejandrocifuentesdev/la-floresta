package com.lafloresta.backend.business.dto;

import com.lafloresta.backend.business.BusinessCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    @NotNull(message = "La categoría es obligatoria")
    private BusinessCategory category;

    @NotBlank(message = "La dirección es obligatoria")
    private String address;

    private String phone;
    private String website;
    private String imageUrl;
}
