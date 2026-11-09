package com.lafloresta.backend.professional;

import com.lafloresta.backend.professional.dto.ProfessionalRequest;
import com.lafloresta.backend.professional.dto.ProfessionalResponse;
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
@RequestMapping("/api/professionals")
public class ProfessionalController {

    private final ProfessionalService professionalService;

    public ProfessionalController(ProfessionalService professionalService) {
        this.professionalService = professionalService;
    }

    @GetMapping
    public List<ProfessionalResponse> getAllProfessionals() {
        return professionalService.getAllProfessionals();
    }

    @GetMapping("/{id}")
    public ProfessionalResponse getProfessionalById(@PathVariable Long id) {
        return professionalService.getProfessionalById(id);
    }

    @PostMapping
    public ProfessionalResponse createProfessional(@Valid @RequestBody ProfessionalRequest request) {
        return professionalService.createProfessional(request);
    }

    @PutMapping("/{id}")
    public ProfessionalResponse updateProfessional(
            @PathVariable Long id,
            @Valid @RequestBody ProfessionalRequest request) {
        return professionalService.updateProfessional(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteProfessional(@PathVariable Long id) {
        professionalService.deleteProfessional(id);
    }
}
