package com.lifelink.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String bloodGroup;
    private String district;
}
