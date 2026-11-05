package com.lafloresta.backend.courseworkshop;

import com.lafloresta.backend.courseworkshop.dto.CourseWorkshopRequest;
import com.lafloresta.backend.courseworkshop.dto.CourseWorkshopResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses-workshops")
public class CourseWorkshopController {

    private final CourseWorkshopService courseWorkshopService;

    public CourseWorkshopController(CourseWorkshopService courseWorkshopService) {
        this.courseWorkshopService = courseWorkshopService;
    }

    @GetMapping
    public List<CourseWorkshopResponse> getAllCoursesWorkshops() {
        return courseWorkshopService.getAllCoursesWorkshops();
    }

    @GetMapping("/{id}")
    public CourseWorkshopResponse getCourseWorkshopById(@PathVariable Long id) {
        return courseWorkshopService.getCourseWorkshopById(id);
    }

    @PostMapping
    public CourseWorkshopResponse createCourseWorkshop(@Valid @RequestBody CourseWorkshopRequest request) {
        return courseWorkshopService.createCourseWorkshop(request);
    }

    @PutMapping("/{id}")
    public CourseWorkshopResponse updateCourseWorkshop(
            @PathVariable Long id,
            @Valid @RequestBody CourseWorkshopRequest request) {

        return courseWorkshopService.updateCourseWorkshop(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteCourseWorkshop(@PathVariable Long id) {
        courseWorkshopService.deleteCourseWorkshop(id);
    }
}