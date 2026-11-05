package com.lafloresta.backend.courseworkshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class CourseWorkshopResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private String location;
    private String organizer;
    private String imageUrl;
}