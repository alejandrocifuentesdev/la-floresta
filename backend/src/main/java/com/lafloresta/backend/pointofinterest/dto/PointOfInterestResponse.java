package com.lafloresta.backend.pointofinterest.dto;

import com.lafloresta.backend.pointofinterest.PointOfInterestCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PointOfInterestResponse {

    private Long id;
    private String name;
    private String description;
    private PointOfInterestCategory category;
    private String address;
    private Double latitude;
    private Double longitude;
    private String imageUrl;
}
