package com.lafloresta.backend.route;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RouteNotFoundException extends RuntimeException {

    public RouteNotFoundException(Long id) {
        super("No se ha encontrado la ruta con id " + id);
    }
}
