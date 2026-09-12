package com.lafloresta.backend.business;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BusinessNotFoundException extends RuntimeException {

    public BusinessNotFoundException(Long id) {
        super("No se ha encontrado el negocio con id " + id);
    }
}
