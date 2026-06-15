package com.lifelink.service;

import com.lifelink.dto.AdminDashboardStatsDto;
import com.lifelink.entity.BloodRequest;
import com.lifelink.repository.BloodRequestRepository;
import com.lifelink.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final BloodRequestRepository bloodRequestRepository;

    public AdminDashboardStatsDto getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalRequests = bloodRequestRepository.count();
        long pendingRequests = bloodRequestRepository.countByStatus("PENDING");
        long acceptedRequests = bloodRequestRepository.countByStatus("ACCEPTED");
        long availableDonors = userRepository.countByAvailableTrue();
        long criticalRequests = bloodRequestRepository.countByPriorityScore(100);

        List<BloodRequest> allRequests = bloodRequestRepository.findAll();
        Integer highestPriorityScore = 0;
        Double averagePriorityScore = 0.0;

        if (!allRequests.isEmpty()) {
            highestPriorityScore = allRequests.stream()
                    .map(BloodRequest::getPriorityScore)
                    .max(Integer::compareTo)
                    .orElse(0);

            averagePriorityScore = allRequests.stream()
                    .map(BloodRequest::getPriorityScore)
                    .mapToInt(Integer::intValue)
                    .average()
                    .orElse(0.0);
        }

        String aiRecommendation = generateRecommendation(
                totalRequests,
                criticalRequests,
                availableDonors,
                averagePriorityScore
        );

        return AdminDashboardStatsDto.builder()
                .totalUsers(totalUsers)
                .totalRequests(totalRequests)
                .pendingRequests(pendingRequests)
                .acceptedRequests(acceptedRequests)
                .availableDonors(availableDonors)
                .criticalRequests(criticalRequests)
                .highestPriorityScore(highestPriorityScore)
                .averagePriorityScore(averagePriorityScore)
                .aiRecommendation(aiRecommendation)
                .build();
    }

    private String generateRecommendation(
            long totalRequests,
            long criticalRequests,
            long availableDonors,
            Double avgPriority
    ) {
        if (criticalRequests > 0 && availableDonors < criticalRequests) {
            return "⚠ Urgent: Critical requests exceed available donors. Consider outreach campaign.";
        }
        if (avgPriority > 70) {
            return "📈 High demand detected. Request urgency is elevated. Increase donor outreach.";
        }
        if (availableDonors > totalRequests * 2) {
            return "✅ Excellent: Sufficient donors available for current requests.";
        }
        return "ℹ System is operating normally. Monitor critical requests.";
    }
}
