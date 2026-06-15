package com.lifelink.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "blood_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodRequest {

    @Id
    private UUID id;

    @Column(name = "patient_name")
    private String patientName;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "hospital_name")
    private String hospitalName;

    private String district;

    @Column(name = "contact_number")
    private String contactNumber;

    private String urgency;

    @Column
    private Integer priorityScore;

    @Column(name = "ai_recommendation", columnDefinition = "TEXT")
    private String aiRecommendation;

    private String status;

    @Column(name = "requester_id")
    private UUID requesterId;

    @Column(name = "accepted_donor_id")
    private UUID acceptedDonorId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
