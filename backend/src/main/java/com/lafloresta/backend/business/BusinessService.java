package com.lafloresta.backend.business;

import com.lafloresta.backend.business.dto.BusinessRequest;
import com.lafloresta.backend.business.dto.BusinessResponse;
import org.springframework.stereotype.Service;

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

    public BusinessResponse createBusiness(BusinessRequest request) {

        Business business = new Business();

        updateBusinessFromRequest(business, request);

        Business savedBusiness = businessRepository.save(business);

        return toResponse(savedBusiness);
    }

    public BusinessResponse updateBusiness(Long id, BusinessRequest request) {

        Business business = getBusinessEntityById(id);

        updateBusinessFromRequest(business, request);

        Business savedBusiness = businessRepository.save(business);

        return toResponse(savedBusiness);
    }

    public void deleteBusiness(Long id) {

        Business business = getBusinessEntityById(id);

        businessRepository.delete(business);
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
                business.getImageUrl()
        );
    }
}
