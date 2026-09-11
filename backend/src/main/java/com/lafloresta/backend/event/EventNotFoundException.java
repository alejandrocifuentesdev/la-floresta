package com.lafloresta.backend.event;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EventNotFoundException extends RuntimeException{

    public EventNotFoundException(Long id) {
        super("No se ha encontrado el evento con id " + id);
    }
}