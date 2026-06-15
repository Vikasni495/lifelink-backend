package com.lifelink.dto;

import lombok.Data;

@Data
public class UpdateProfileDto {

    private String phone;
    private String bloodGroup;
    private String district;
    private Boolean available;
}
