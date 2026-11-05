package com.lafloresta.backend.courseworkshop;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CourseWorkshopNotFoundException extends RuntimeException{

    public CourseWorkshopNotFoundException(Long id) {
        super("No se ha encontrado el curso o taller con id " + id);
    }
}
