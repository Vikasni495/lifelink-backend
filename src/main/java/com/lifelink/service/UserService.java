package com.lifelink.service;

import com.lifelink.dto.DashboardStatsDto;
import com.lifelink.dto.ProfileDto;
import com.lifelink.dto.UpdateProfileDto;
import com.lifelink.entity.User;
import com.lifelink.repository.BloodRequestRepository;
import com.lifelink.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BloodRequestRepository bloodRequestRepository;

    public ProfileDto getProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return ProfileDto.builder()
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .bloodGroup(user.getBloodGroup())
                .district(user.getDistrict())
                .available(user.getAvailable())
                .role(user.getRole())
                .build();
    }

    public String updateProfile(
            String email,
            UpdateProfileDto request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        user.setPhone(request.getPhone());
        user.setBloodGroup(request.getBloodGroup());
        user.setDistrict(request.getDistrict());
        user.setAvailable(request.getAvailable());

        userRepository.save(user);

        return "Profile Updated Successfully";
    }

    public DashboardStatsDto getDashboardStats(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return DashboardStatsDto.builder()
                .totalRequests(bloodRequestRepository.count())
                .myRequests(bloodRequestRepository.countByRequesterId(user.getId()))
                .acceptedRequests(bloodRequestRepository.countByAcceptedDonorId(user.getId()))
                .availableDonors(userRepository.countByAvailableTrue())
                .build();
    }
}
