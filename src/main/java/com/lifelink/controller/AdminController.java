package com.lifelink.controller;

import com.lifelink.dto.AdminDashboardStatsDto;
import com.lifelink.dto.AdminRequestDto;
import com.lifelink.dto.AdminStatsDto;
import com.lifelink.dto.AdminUserDto;
import com.lifelink.dto.RecentRequestDto;
import com.lifelink.dto.RecentUserDto;
import com.lifelink.dto.UpdateAvailabilityDto;
import com.lifelink.dto.UpdateRequestStatusDto;
import com.lifelink.entity.BloodRequest;
import com.lifelink.entity.User;
import com.lifelink.repository.BloodRequestRepository;
import com.lifelink.repository.UserRepository;
import com.lifelink.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final BloodRequestRepository bloodRequestRepository;
    private final AdminService adminService;

    private void ensureAdmin(Authentication authentication) {
        if (authentication == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden"));

        if (user.getRole() == null || !user.getRole().equalsIgnoreCase("ADMIN")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
    }

    @GetMapping("/dashboard-stats")
    public AdminDashboardStatsDto dashboardStats(Authentication authentication) {
        ensureAdmin(authentication);
        return adminService.getDashboardStats();
    }

    @GetMapping("/stats")
    public AdminStatsDto stats(Authentication authentication) {
        ensureAdmin(authentication);

        long totalUsers = userRepository.count();
        long totalAvailableDonors = userRepository.countByAvailableTrue();
        long totalRequests = bloodRequestRepository.count();
        long totalAccepted = bloodRequestRepository.countByStatus("ACCEPTED");

        return AdminStatsDto.builder()
                .totalUsers(totalUsers)
                .totalAvailableDonors(totalAvailableDonors)
                .totalRequests(totalRequests)
                .totalAcceptedRequests(totalAccepted)
                .build();
    }

    @GetMapping("/recent-requests")
    public List<RecentRequestDto> recentRequests(Authentication authentication) {
        ensureAdmin(authentication);

        List<BloodRequest> recent = bloodRequestRepository.findTop5ByOrderByCreatedAtDesc();

        return recent.stream().map(r -> RecentRequestDto.builder()
                .id(r.getId())
                .patientName(r.getPatientName())
                .bloodGroup(r.getBloodGroup())
                .district(r.getDistrict())
                .status(r.getStatus())
                .createdAt(r.getCreatedAt())
                .build()).collect(Collectors.toList());
    }

    @GetMapping("/recent-users")
    public List<RecentUserDto> recentUsers(Authentication authentication) {
        ensureAdmin(authentication);

        List<User> recent = userRepository.findTop5ByOrderByCreatedAtDesc();

        return recent.stream().map(u -> RecentUserDto.builder()
                .id(u.getId())
                .fullName(u.getFullName())
                .email(u.getEmail())
                .district(u.getDistrict())
                .bloodGroup(u.getBloodGroup())
                .available(u.getAvailable())
                .createdAt(u.getCreatedAt())
                .build()).collect(Collectors.toList());
    }

    @GetMapping("/users")
    public List<AdminUserDto> getUsers(Authentication authentication) {
        ensureAdmin(authentication);

        return userRepository.findAll().stream().map(u -> AdminUserDto.builder()
                .id(u.getId())
                .fullName(u.getFullName())
                .email(u.getEmail())
                .phone(u.getPhone())
                .bloodGroup(u.getBloodGroup())
                .district(u.getDistrict())
                .available(u.getAvailable())
                .role(u.getRole())
                .createdAt(u.getCreatedAt())
                .build()).collect(Collectors.toList());
    }

    @PutMapping("/users/{id}/availability")
    public String updateUserAvailability(
            @PathVariable UUID id,
            @RequestBody UpdateAvailabilityDto request,
            Authentication authentication
    ) {
        ensureAdmin(authentication);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        user.setAvailable(request.getAvailable());
        userRepository.save(user);

        return "User availability updated";
    }

    @GetMapping("/requests")
    public List<AdminRequestDto> getRequests(Authentication authentication) {
        ensureAdmin(authentication);

        List<AdminRequestDto> requests = bloodRequestRepository.findAll().stream().map(r -> AdminRequestDto.builder()
                .id(r.getId())
                .patientName(r.getPatientName())
                .bloodGroup(r.getBloodGroup())
                .district(r.getDistrict())
                .hospitalName(r.getHospitalName())
                .status(r.getStatus())
                .urgency(r.getUrgency())
                .priorityScore(r.getPriorityScore())
                .requesterName(userRepository.findById(r.getRequesterId()).map(User::getFullName).orElse("Unknown"))
                .requesterPhone(userRepository.findById(r.getRequesterId()).map(User::getPhone).orElse("Unknown"))
                .createdAt(r.getCreatedAt())
                .build()).collect(Collectors.toList());

        requests.sort((a, b) -> b.getPriorityScore().compareTo(a.getPriorityScore()));
        return requests;
    }

    @PutMapping("/requests/{id}/status")
    public String updateRequestStatus(
            @PathVariable UUID id,
            @RequestBody UpdateRequestStatusDto request,
            Authentication authentication
    ) {
        ensureAdmin(authentication);

        BloodRequest bloodRequest = bloodRequestRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        bloodRequest.setStatus(request.getStatus());
        bloodRequestRepository.save(bloodRequest);

        return "Request status updated";
    }
}
