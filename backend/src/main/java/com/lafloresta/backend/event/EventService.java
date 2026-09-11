package com.lafloresta.backend.event;

import com.lafloresta.backend.event.dto.EventRequest;
import com.lafloresta.backend.event.dto.EventResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<EventResponse> getAllEvents() {

        List<Event> events = eventRepository.findAll();
        List<EventResponse> responses = new ArrayList<>();

        for (Event event : events) {
            responses.add(toResponse(event));
        }

        return responses;
    }

    public EventResponse getEventById(Long id) {

        Event event = getEventEntityById(id);

        return toResponse(event);
    }

    public EventResponse createEvent(EventRequest request) {

        Event event = new Event();

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setLocation(request.getLocation());
        event.setImageUrl(request.getImageUrl());

        Event savedEvent = eventRepository.save(event);

        return toResponse(savedEvent);
    }

    public EventResponse updateEvent(Long id, EventRequest request) {

        Event event = getEventEntityById(id);

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setLocation(request.getLocation());
        event.setImageUrl(request.getImageUrl());

        Event savedEvent = eventRepository.save(event);

        return toResponse(savedEvent);
    }

    public void deleteEvent(Long id) {

        Event event = getEventEntityById(id);

        eventRepository.delete(event);
    }

    public List<EventResponse> getUpcomingEvents() {

        List<Event> events =
                eventRepository.findByDateGreaterThanEqualOrderByDateAsc(LocalDate.now());

        List<EventResponse> responses = new ArrayList<>();

        for (Event event : events) {
            responses.add(toResponse(event));
        }

        return responses;
    }

    private Event getEventEntityById(Long id) {

        return eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException(id));
    }

    private EventResponse toResponse(Event event) {

        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getDate(),
                event.getLocation(),
                event.getImageUrl()
        );
    }
}