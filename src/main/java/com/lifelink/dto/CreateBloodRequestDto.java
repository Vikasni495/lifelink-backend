package com.lifelink.dto;

import lombok.Data;

@Data
public class CreateBloodRequestDto {

    private String patientName;
    private String bloodGroup;
    private String hospitalName;
    private String district;
    private String contactNumber;
    private String urgency;
}
