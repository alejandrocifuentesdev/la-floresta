package com.lafloresta.backend.business;

import com.lafloresta.backend.business.dto.BusinessRequest;
import com.lafloresta.backend.business.dto.BusinessResponse;
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
@RequestMapping("/api/businesses")
public class BusinessController {

    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping
    public List<BusinessResponse> getAllBusinesses() {
        return businessService.getAllBusinesses();
    }

    @GetMapping("/{id}")
    public BusinessResponse getBusinessById(@PathVariable Long id) {
        return businessService.getBusinessById(id);
    }

    @GetMapping("/category/{category}")
    public List<BusinessResponse> getBusinessesByCategory(
            @PathVariable BusinessCategory category) {

        return businessService.getBusinessesByCategory(category);
    }

    @PostMapping
    public BusinessResponse createBusiness(
            @Valid @RequestBody BusinessRequest request) {

        return businessService.createBusiness(request);
    }

    @PutMapping("/{id}")
    public BusinessResponse updateBusiness(
            @PathVariable Long id,
            @Valid @RequestBody BusinessRequest request) {

        return businessService.updateBusiness(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteBusiness(@PathVariable Long id) {
        businessService.deleteBusiness(id);
    }
}
