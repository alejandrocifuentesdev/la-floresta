package com.lafloresta.backend.business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BusinessRepository extends JpaRepository<Business, Long> {

    List<Business> findByCategory(BusinessCategory category);

    List<Business> findByFeaturedTrueOrderByIdAsc();

    long countByFeaturedTrue();

    // Serialize writes before checking the limit, including when no rows are featured yet.
    @Modifying
    @Query(value = "LOCK TABLE business IN SHARE ROW EXCLUSIVE MODE", nativeQuery = true)
    void lockForFeaturedUpdate();
}
