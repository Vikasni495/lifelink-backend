package com.lifelink.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileDto {

    private String fullName;
    private String email;
    private String phone;
    private String bloodGroup;
    private String district;
    private Boolean available;
    private String role;
}
