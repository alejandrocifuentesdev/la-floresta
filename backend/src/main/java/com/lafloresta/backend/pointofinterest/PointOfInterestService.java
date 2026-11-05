package com.lafloresta.backend.pointofinterest;

import com.lafloresta.backend.pointofinterest.dto.PointOfInterestRequest;
import com.lafloresta.backend.pointofinterest.dto.PointOfInterestResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lafloresta.backend.featured.FeaturedLimitException;

import java.util.ArrayList;
import java.util.List;

@Service
public class PointOfInterestService {

    private final PointOfInterestRepository pointOfInterestRepository;

    public PointOfInterestService(PointOfInterestRepository pointOfInterestRepository) {
        this.pointOfInterestRepository = pointOfInterestRepository;
    }

    public List<PointOfInterestResponse> getAllPointsOfInterest() {

        List<PointOfInterest> pointsOfInterest = pointOfInterestRepository.findAll();
        List<PointOfInterestResponse> responses = new ArrayList<>();

        for (PointOfInterest pointOfInterest : pointsOfInterest) {
            responses.add(toResponse(pointOfInterest));
        }

        return responses;
    }

    public PointOfInterestResponse getPointOfInterestById(Long id) {

        PointOfInterest pointOfInterest = getPointOfInterestEntityById(id);

        return toResponse(pointOfInterest);
    }

    public List<PointOfInterestResponse> getPointsOfInterestByCategory(
            PointOfInterestCategory category) {

        List<PointOfInterest> pointsOfInterest =
                pointOfInterestRepository.findByCategory(category);
        List<PointOfInterestResponse> responses = new ArrayList<>();

        for (PointOfInterest pointOfInterest : pointsOfInterest) {
            responses.add(toResponse(pointOfInterest));
        }

        return responses;
    }

    @Transactional
    public PointOfInterestResponse createPointOfInterest(PointOfInterestRequest request) {

        pointOfInterestRepository.lockForFeaturedUpdate();

        PointOfInterest pointOfInterest = new PointOfInterest();

        updatePointOfInterestFromRequest(pointOfInterest, request);

        PointOfInterest savedPointOfInterest = pointOfInterestRepository.save(pointOfInterest);

        return toResponse(savedPointOfInterest);
    }

    @Transactional
    public PointOfInterestResponse updatePointOfInterest(
            Long id,
            PointOfInterestRequest request) {

        pointOfInterestRepository.lockForFeaturedUpdate();

        PointOfInterest pointOfInterest = getPointOfInterestEntityById(id);

        updatePointOfInterestFromRequest(pointOfInterest, request);

        PointOfInterest savedPointOfInterest = pointOfInterestRepository.save(pointOfInterest);

        return toResponse(savedPointOfInterest);
    }

    @Transactional
    public void deletePointOfInterest(Long id) {

        pointOfInterestRepository.lockForFeaturedUpdate();

        PointOfInterest pointOfInterest = getPointOfInterestEntityById(id);

        pointOfInterestRepository.delete(pointOfInterest);
    }

    public List<PointOfInterestResponse> getFeaturedPointsOfInterest() {
        List<PointOfInterestResponse> responses = new ArrayList<>();
        for (PointOfInterest pointOfInterest : pointOfInterestRepository.findByFeaturedTrueOrderByIdAsc()) {
            responses.add(toResponse(pointOfInterest));
        }
        return responses;
    }

    @Transactional
    public PointOfInterestResponse updateFeatured(Long id, boolean featured) {
        pointOfInterestRepository.lockForFeaturedUpdate();
        PointOfInterest pointOfInterest = getPointOfInterestEntityById(id);
        applyFeatured(pointOfInterest, featured);
        return toResponse(pointOfInterestRepository.save(pointOfInterest));
    }

    private void applyFeatured(PointOfInterest pointOfInterest, boolean featured) {
        if (featured && !pointOfInterest.isFeatured() && pointOfInterestRepository.countByFeaturedTrue() >= 3) {
            throw new FeaturedLimitException();
        }
        pointOfInterest.setFeatured(featured);
    }

    private PointOfInterest getPointOfInterestEntityById(Long id) {

        return pointOfInterestRepository.findById(id)
                .orElseThrow(() -> new PointOfInterestNotFoundException(id));
    }

    private void updatePointOfInterestFromRequest(
            PointOfInterest pointOfInterest,
            PointOfInterestRequest request) {

        pointOfInterest.setName(request.getName());
        pointOfInterest.setDescription(request.getDescription());
        pointOfInterest.setCategory(request.getCategory());
        pointOfInterest.setAddress(request.getAddress());
        pointOfInterest.setLatitude(request.getLatitude());
        pointOfInterest.setLongitude(request.getLongitude());
        pointOfInterest.setImageUrl(request.getImageUrl());
        if (request.getFeatured() != null) {
            applyFeatured(pointOfInterest, request.getFeatured());
        }
    }

    private PointOfInterestResponse toResponse(PointOfInterest pointOfInterest) {

        return new PointOfInterestResponse(
                pointOfInterest.getId(),
                pointOfInterest.getName(),
                pointOfInterest.getDescription(),
                pointOfInterest.getCategory(),
                pointOfInterest.getAddress(),
                pointOfInterest.getLatitude(),
                pointOfInterest.getLongitude(),
                pointOfInterest.getImageUrl(),
                pointOfInterest.isFeatured()
        );
    }
}
