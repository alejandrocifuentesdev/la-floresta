package com.lafloresta.backend.event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository <Event, Long> {

        List<Event> findByDateGreaterThanEqualOrderByDateAsc(LocalDate date);
    }

