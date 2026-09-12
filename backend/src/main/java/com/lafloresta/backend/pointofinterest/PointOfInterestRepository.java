package com.lafloresta.backend.pointofinterest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointOfInterestRepository extends JpaRepository<PointOfInterest, Long> {

    List<PointOfInterest> findByCategory(PointOfInterestCategory category);
}
