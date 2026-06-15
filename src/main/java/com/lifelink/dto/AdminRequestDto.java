package com.lifelink.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class AdminRequestDto {

    private UUID id;
    private String patientName;
    private String bloodGroup;
    private String district;
    private String hospitalName;
    private String status;
    private String urgency;
    private Integer priorityScore;
    private String requesterName;
    private String requesterPhone;
    private LocalDateTime createdAt;
}
