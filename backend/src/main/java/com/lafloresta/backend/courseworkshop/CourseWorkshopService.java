package com.lafloresta.backend.courseworkshop;

import com.lafloresta.backend.courseworkshop.dto.CourseWorkshopRequest;
import com.lafloresta.backend.courseworkshop.dto.CourseWorkshopResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseWorkshopService {

    private final CourseWorkshopRepository courseWorkshopRepository;

    public CourseWorkshopService(CourseWorkshopRepository courseWorkshopRepository) {
        this.courseWorkshopRepository = courseWorkshopRepository;
    }

    public List<CourseWorkshopResponse> getAllCoursesWorkshops() {

        List<CourseWorkshop> coursesWorkshops = courseWorkshopRepository.findAll();
        List<CourseWorkshopResponse> responses = new ArrayList<>();

        for (CourseWorkshop courseWorkshop : coursesWorkshops) {
            responses.add(toResponse(courseWorkshop));
        }

        return responses;
    }

    public CourseWorkshopResponse getCourseWorkshopById(Long id) {

        CourseWorkshop courseWorkshop = getCourseWorkshopEntityById(id);

        return toResponse(courseWorkshop);
    }

    public CourseWorkshopResponse createCourseWorkshop(CourseWorkshopRequest request) {

        CourseWorkshop courseWorkshop = new CourseWorkshop();

        updateCourseWorkshopFromRequest(courseWorkshop, request);

        CourseWorkshop savedCourseWorkshop = courseWorkshopRepository.save(courseWorkshop);

        return toResponse(savedCourseWorkshop);
    }

    public CourseWorkshopResponse updateCourseWorkshop(Long id, CourseWorkshopRequest request) {

        CourseWorkshop courseWorkshop = getCourseWorkshopEntityById(id);

        updateCourseWorkshopFromRequest(courseWorkshop, request);

        CourseWorkshop savedCourseWorkshop = courseWorkshopRepository.save(courseWorkshop);

        return toResponse(savedCourseWorkshop);
    }

    public void deleteCourseWorkshop(Long id) {

        CourseWorkshop courseWorkshop = getCourseWorkshopEntityById(id);

        courseWorkshopRepository.delete(courseWorkshop);
    }

    private CourseWorkshop getCourseWorkshopEntityById(Long id) {

        return courseWorkshopRepository.findById(id)
                .orElseThrow(() -> new CourseWorkshopNotFoundException(id));
    }

    private void updateCourseWorkshopFromRequest(CourseWorkshop courseWorkshop, CourseWorkshopRequest request) {

        courseWorkshop.setTitle(request.getTitle());
        courseWorkshop.setDescription(request.getDescription());
        courseWorkshop.setDate(request.getDate());
        courseWorkshop.setLocation(request.getLocation());
        courseWorkshop.setOrganizer(request.getOrganizer());
        courseWorkshop.setImageUrl(request.getImageUrl());
    }

    private CourseWorkshopResponse toResponse(CourseWorkshop courseWorkshop) {

        return new CourseWorkshopResponse(
                courseWorkshop.getId(),
                courseWorkshop.getTitle(),
                courseWorkshop.getDescription(),
                courseWorkshop.getDate(),
                courseWorkshop.getLocation(),
                courseWorkshop.getOrganizer(),
                courseWorkshop.getImageUrl()
        );
    }
}