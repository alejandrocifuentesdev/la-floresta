package com.lafloresta.backend.pointofinterest;

import com.lafloresta.backend.pointofinterest.dto.PointOfInterestRequest;
import com.lafloresta.backend.pointofinterest.dto.PointOfInterestResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/points-of-interest")
public class PointOfInterestController {

    private final PointOfInterestService pointOfInterestService;

    public PointOfInterestController(PointOfInterestService pointOfInterestService) {
        this.pointOfInterestService = pointOfInterestService;
    }

    @GetMapping
    public List<PointOfInterestResponse> getAllPointsOfInterest() {
        return pointOfInterestService.getAllPointsOfInterest();
    }

    @GetMapping("/{id}")
    public PointOfInterestResponse getPointOfInterestById(@PathVariable Long id) {
        return pointOfInterestService.getPointOfInterestById(id);
    }

    @GetMapping("/category/{category}")
    public List<PointOfInterestResponse> getPointsOfInterestByCategory(
            @PathVariable PointOfInterestCategory category) {

        return pointOfInterestService.getPointsOfInterestByCategory(category);
    }

    @PostMapping
    public PointOfInterestResponse createPointOfInterest(
            @Valid @RequestBody PointOfInterestRequest request) {

        return pointOfInterestService.createPointOfInterest(request);
    }

    @PutMapping("/{id}")
    public PointOfInterestResponse updatePointOfInterest(
            @PathVariable Long id,
            @Valid @RequestBody PointOfInterestRequest request) {

        return pointOfInterestService.updatePointOfInterest(id, request);
    }

    @DeleteMapping("/{id}")
    public void deletePointOfInterest(@PathVariable Long id) {
        pointOfInterestService.deletePointOfInterest(id);
    }
}
