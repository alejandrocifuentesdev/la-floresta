package com.lafloresta.backend.business;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Long> {

    List<Business> findByCategory(BusinessCategory category);
}
