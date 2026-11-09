package com.lafloresta.backend.professional.dto;

import com.lafloresta.backend.professional.ProfessionalCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfessionalResponse {

    private Long id;
    private String name;
    private String description;
    private ProfessionalCategory category;
    private String phone;
    private String email;
    private String website;
    private String imageUrl;
}
