package com.lifelink.repository;

import com.lifelink.entity.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BloodRequestRepository
        extends JpaRepository<BloodRequest, UUID> {

    List<BloodRequest> findByRequesterId(UUID requesterId);

    List<BloodRequest> findByAcceptedDonorId(UUID acceptedDonorId);

    long countByRequesterId(UUID requesterId);

    long countByAcceptedDonorId(UUID acceptedDonorId);

    long countByStatus(String status);

    long countByPriorityScore(Integer priorityScore);

    java.util.List<BloodRequest> findTop5ByOrderByCreatedAtDesc();
}
