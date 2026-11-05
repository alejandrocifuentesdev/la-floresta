package com.lafloresta.backend.pointofinterest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PointOfInterestRepository extends JpaRepository<PointOfInterest, Long> {

    List<PointOfInterest> findByCategory(PointOfInterestCategory category);

    List<PointOfInterest> findByFeaturedTrueOrderByIdAsc();

    long countByFeaturedTrue();

    // Serialize writes before checking the limit, including when no rows are featured yet.
    @Modifying
    @Query(value = "LOCK TABLE point_of_interest IN SHARE ROW EXCLUSIVE MODE", nativeQuery = true)
    void lockForFeaturedUpdate();
}
