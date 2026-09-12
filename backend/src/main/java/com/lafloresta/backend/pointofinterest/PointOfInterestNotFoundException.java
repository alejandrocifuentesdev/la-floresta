package com.lafloresta.backend.pointofinterest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PointOfInterestNotFoundException extends RuntimeException {

    public PointOfInterestNotFoundException(Long id) {
        super("No se ha encontrado el punto de interés con id " + id);
    }
}
