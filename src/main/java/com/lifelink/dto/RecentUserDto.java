package com.lifelink.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentUserDto {
    private UUID id;
    private String fullName;
    private String email;
    private String district;
    private String bloodGroup;
    private Boolean available;
    private LocalDateTime createdAt;
}
