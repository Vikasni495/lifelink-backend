package com.lifelink.dto;

import lombok.Data;

@Data
public class CreateRequest {

    private String patientName;
    private String bloodGroup;
    private String hospital;
    private String district;
    private Integer unitsNeeded;
    private String requiredBy;
}
