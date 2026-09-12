package com.lafloresta.backend.business.dto;

import com.lafloresta.backend.business.BusinessCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BusinessResponse {

    private Long id;
    private String name;
    private String description;
    private BusinessCategory category;
    private String address;
    private String phone;
    private String website;
    private String imageUrl;
}
