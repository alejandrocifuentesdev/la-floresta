package com.lafloresta.backend.professional;

import com.lafloresta.backend.professional.dto.ProfessionalRequest;
import com.lafloresta.backend.professional.dto.ProfessionalResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProfessionalService {

    private final ProfessionalRepository professionalRepository;

    public ProfessionalService(ProfessionalRepository professionalRepository) {
        this.professionalRepository = professionalRepository;
    }

    public List<ProfessionalResponse> getAllProfessionals() {
        List<ProfessionalResponse> responses = new ArrayList<>();

        for (Professional professional : professionalRepository.findAll()) {
            responses.add(toResponse(professional));
        }

        return responses;
    }

    public ProfessionalResponse getProfessionalById(Long id) {
        return toResponse(getProfessionalEntityById(id));
    }

    public ProfessionalResponse createProfessional(ProfessionalRequest request) {
        Professional professional = new Professional();
        updateProfessionalFromRequest(professional, request);
        return toResponse(professionalRepository.save(professional));
    }

    public ProfessionalResponse updateProfessional(Long id, ProfessionalRequest request) {
        Professional professional = getProfessionalEntityById(id);
        updateProfessionalFromRequest(professional, request);
        return toResponse(professionalRepository.save(professional));
    }

    public void deleteProfessional(Long id) {
        Professional professional = getProfessionalEntityById(id);
        professionalRepository.delete(professional);
    }

    private Professional getProfessionalEntityById(Long id) {
        return professionalRepository.findById(id)
                .orElseThrow(() -> new ProfessionalNotFoundException(id));
    }

    private void updateProfessionalFromRequest(Professional professional, ProfessionalRequest request) {
        professional.setName(request.getName());
        professional.setDescription(request.getDescription());
        professional.setCategory(request.getCategory());
        professional.setPhone(request.getPhone());
        professional.setEmail(request.getEmail());
        professional.setWebsite(request.getWebsite());
        professional.setImageUrl(request.getImageUrl());
    }

    private ProfessionalResponse toResponse(Professional professional) {
        return new ProfessionalResponse(
                professional.getId(),
                professional.getName(),
                professional.getDescription(),
                professional.getCategory(),
                professional.getPhone(),
                professional.getEmail(),
                professional.getWebsite(),
                professional.getImageUrl()
        );
    }
}
