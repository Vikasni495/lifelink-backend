package com.lifelink.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class AdminUserDto {

    private UUID id;
    private String fullName;
    private String email;
    private String phone;
    private String bloodGroup;
    private String district;
    private Boolean available;
    private String role;
    private LocalDateTime createdAt;
}
