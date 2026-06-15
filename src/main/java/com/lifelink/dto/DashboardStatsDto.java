package com.lifelink.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDto {

    private long totalRequests;
    private long myRequests;
    private long acceptedRequests;
    private long availableDonors;
}
