package com.lifelink.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardStatsDto {
    private long totalUsers;
    private long totalRequests;
    private long pendingRequests;
    private long acceptedRequests;
    private long availableDonors;
    private long criticalRequests;
    private Integer highestPriorityScore;
    private Double averagePriorityScore;
    private String aiRecommendation;
}
