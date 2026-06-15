package com.lifelink.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestDetailsDto {

    private String patientName;
    private String bloodGroup;
    private String hospitalName;
    private String district;
    private String status;
    private Integer priorityScore;
    private String aiRecommendation;

    private String requesterName;
    private String requesterPhone;

    private String donorName;
    private String donorPhone;
}
