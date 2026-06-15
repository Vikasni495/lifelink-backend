package com.lifelink.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private UUID id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;

    @Column(name = "blood_group")
    private String bloodGroup;

    private String district;

    private String role;

    private Boolean available;

    @Column(name = "last_donation_date")
    private LocalDate lastDonationDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
