package com.lafloresta.backend.business;

import com.lafloresta.backend.business.dto.BusinessRequest;
import com.lafloresta.backend.business.dto.BusinessResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lafloresta.backend.featured.FeaturedLimitException;

import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessService {

    private final BusinessRepository businessRepository;

    public BusinessService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    public List<BusinessResponse> getAllBusinesses() {

        List<Business> businesses = businessRepository.findAll();
        List<BusinessResponse> responses = new ArrayList<>();

        for (Business business : businesses) {
            responses.add(toResponse(business));
        }

        return responses;
    }

    public BusinessResponse getBusinessById(Long id) {

        Business business = getBusinessEntityById(id);

        return toResponse(business);
    }

    public List<BusinessResponse> getBusinessesByCategory(BusinessCategory category) {

        List<Business> businesses = businessRepository.findByCategory(category);
        List<BusinessResponse> responses = new ArrayList<>();

        for (Business business : businesses) {
            responses.add(toResponse(business));
        }

        return responses;
    }

    @Transactional
    public BusinessResponse createBusiness(BusinessRequest request) {

        businessRepository.lockForFeaturedUpdate();

        Business business = new Business();

        updateBusinessFromRequest(business, request);

        Business savedBusiness = businessRepository.save(business);

        return toResponse(savedBusiness);
    }

    @Transactional
    public BusinessResponse updateBusiness(Long id, BusinessRequest request) {

        businessRepository.lockForFeaturedUpdate();

        Business business = getBusinessEntityById(id);

        updateBusinessFromRequest(business, request);

        Business savedBusiness = businessRepository.save(business);

        return toResponse(savedBusiness);
    }

    @Transactional
    public void deleteBusiness(Long id) {

        businessRepository.lockForFeaturedUpdate();

        Business business = getBusinessEntityById(id);

        businessRepository.delete(business);
    }

    public List<BusinessResponse> getFeaturedBusinesses() {
        List<BusinessResponse> responses = new ArrayList<>();
        for (Business business : businessRepository.findByFeaturedTrueOrderByIdAsc()) {
            responses.add(toResponse(business));
        }
        return responses;
    }

    @Transactional
    public BusinessResponse updateFeatured(Long id, boolean featured) {
        businessRepository.lockForFeaturedUpdate();
        Business business = getBusinessEntityById(id);
        applyFeatured(business, featured);
        return toResponse(businessRepository.save(business));
    }

    private void applyFeatured(Business business, boolean featured) {
        if (featured && !business.isFeatured() && businessRepository.countByFeaturedTrue() >= 3) {
            throw new FeaturedLimitException();
        }
        business.setFeatured(featured);
    }

    private Business getBusinessEntityById(Long id) {

        return businessRepository.findById(id)
                .orElseThrow(() -> new BusinessNotFoundException(id));
    }

    private void updateBusinessFromRequest(Business business, BusinessRequest request) {

        business.setName(request.getName());
        business.setDescription(request.getDescription());
        business.setCategory(request.getCategory());
        business.setAddress(request.getAddress());
        business.setPhone(request.getPhone());
        business.setWebsite(request.getWebsite());
        business.setImageUrl(request.getImageUrl());
        if (request.getFeatured() != null) {
            applyFeatured(business, request.getFeatured());
        }
    }

    private BusinessResponse toResponse(Business business) {

        return new BusinessResponse(
                business.getId(),
                business.getName(),
                business.getDescription(),
                business.getCategory(),
                business.getAddress(),
                business.getPhone(),
                business.getWebsite(),
                business.getImageUrl(),
                business.isFeatured()
        );
    }
}
