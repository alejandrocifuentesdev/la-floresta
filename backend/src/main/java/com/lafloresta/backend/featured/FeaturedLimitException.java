package com.lafloresta.backend.featured;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Solo se pueden seleccionar tres registros para el inicio")
public class FeaturedLimitException extends RuntimeException {
    public FeaturedLimitException() {
        super("Solo se pueden seleccionar tres registros para el inicio");
    }
}
