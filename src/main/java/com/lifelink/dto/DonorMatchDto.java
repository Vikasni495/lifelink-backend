package com.lifelink.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO representing a recommended donor match.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonorMatchDto {

    private String fullName;

    private String bloodGroup;

    private String district;

    private Boolean available;

    private Integer matchScore;

}

