package com.lifelink.service;

import com.lifelink.dto.CreateBloodRequestDto;
import com.lifelink.dto.RequestDetailsDto;
import com.lifelink.dto.DonorMatchDto;
import com.lifelink.entity.BloodRequest;
import com.lifelink.repository.BloodRequestRepository;
import com.lifelink.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BloodRequestService {

    private final BloodRequestRepository bloodRequestRepository;
    private final UserRepository userRepository;

    public BloodRequestService(
            BloodRequestRepository bloodRequestRepository,
            UserRepository userRepository
    ) {
        this.bloodRequestRepository = bloodRequestRepository;
        this.userRepository = userRepository;
    }

    public String createRequest(
            CreateBloodRequestDto request,
            String email
    ) {

        com.lifelink.entity.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int priorityScore = 40;
        if ("CRITICAL".equalsIgnoreCase(request.getUrgency())) {
            priorityScore = 100;
        } else if ("HIGH".equalsIgnoreCase(request.getUrgency())) {
            priorityScore = 80;
        } else if ("MEDIUM".equalsIgnoreCase(request.getUrgency())) {
            priorityScore = 60;
        }

        long donorCount = userRepository.findByBloodGroupAndAvailableTrue(
                request.getBloodGroup()
        ).stream()
                .filter(u ->
                        u.getDistrict() != null &&
                        u.getDistrict().equalsIgnoreCase(request.getDistrict())
                )
                .count();

        String aiRecommendation;
        if ("CRITICAL".equalsIgnoreCase(request.getUrgency())) {
            aiRecommendation =
                    "🚨 This request is critical. There are "
                            + donorCount +
                            " available "
                            + request.getBloodGroup() +
                            " donors in "
                            + request.getDistrict() +
                            ". Immediate outreach is recommended.";
        } else if ("HIGH".equalsIgnoreCase(request.getUrgency())) {
            aiRecommendation =
                    "⚠ High priority request. "
                            + donorCount +
                            " matching donors found nearby.";
        } else {
            aiRecommendation =
                    "✅ Request registered successfully. "
                            + donorCount +
                            " potential donors available.";
        }

        System.out.println("AI RECOMMENDATION = " + aiRecommendation);

        BloodRequest bloodRequest =
                BloodRequest.builder()
                        .id(UUID.randomUUID())
                        .patientName(request.getPatientName())
                        .bloodGroup(request.getBloodGroup())
                        .hospitalName(request.getHospitalName())
                        .district(request.getDistrict())
                        .contactNumber(request.getContactNumber())
                        .urgency(request.getUrgency())
                        .priorityScore(priorityScore)
                        .aiRecommendation(aiRecommendation)
                        .status("PENDING")
                        .requesterId(user.getId())
                        .createdAt(LocalDateTime.now())
                        .build();

        System.out.println("ENTITY VALUE = " + bloodRequest.getAiRecommendation());

        bloodRequestRepository.save(bloodRequest);

        return "Blood request created successfully";
    }

    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }

        public List<?> findMatchingDonors(UUID requestId) {

        BloodRequest request =
            bloodRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        return userRepository.findByBloodGroupAndAvailableTrue(
            request.getBloodGroup()
        );
        }

    public List<DonorMatchDto> getRecommendedDonors(UUID id) {
        BloodRequest request = bloodRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        List<com.lifelink.entity.User> matchingUsers = userRepository.findByBloodGroupAndAvailableTrue(
                request.getBloodGroup()
        );

        List<DonorMatchDto> matches = matchingUsers.stream()
                .map(user -> {
                    int score = 0;
                    if (user.getBloodGroup() != null && user.getBloodGroup().equals(request.getBloodGroup())) {
                        score += 60;
                    }
                    if (user.getDistrict() != null && request.getDistrict() != null
                            && user.getDistrict().equalsIgnoreCase(request.getDistrict())) {
                        score += 30;
                    }
                    if (Boolean.TRUE.equals(user.getAvailable())) {
                        score += 10;
                    }
                    return DonorMatchDto.builder()
                            .fullName(user.getFullName())
                            .bloodGroup(user.getBloodGroup())
                            .district(user.getDistrict())
                            .available(user.getAvailable())
                            .matchScore(score)
                            .build();
                })
                .collect(Collectors.toList());

        matches.sort((a, b) -> b.getMatchScore().compareTo(a.getMatchScore()));
        return matches;
    }

    public String acceptRequest(
            UUID requestId,
            String email
    ) {

        BloodRequest request =
                bloodRequestRepository.findById(requestId)
                        .orElseThrow(() ->
                                new RuntimeException("Request not found"));

        com.lifelink.entity.User donor =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("Donor not found"));

        request.setStatus("ACCEPTED");
        request.setAcceptedDonorId(donor.getId());

        bloodRequestRepository.save(request);

        return "Blood request accepted successfully";
    }

    public List<BloodRequest> myRequests(String email) {

        com.lifelink.entity.User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bloodRequestRepository.findByRequesterId(user.getId());
    }

    public List<BloodRequest> myAcceptedRequests(String email) {

        com.lifelink.entity.User donor =
                userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("User not found"));

        return bloodRequestRepository.findByAcceptedDonorId(
                donor.getId()
        );
    }

    public RequestDetailsDto getRequestDetails(UUID requestId) {
                BloodRequest request =
                                bloodRequestRepository.findById(requestId)
                                                .orElseThrow(() ->
                                                                new RuntimeException("Request not found"));

                String requesterName = "";
                String requesterPhone = "";

                if (request.getRequesterId() != null) {
                        var requesterOpt = userRepository.findById(request.getRequesterId());
                        if (requesterOpt.isPresent()) {
                                requesterName = requesterOpt.get().getFullName();
                                requesterPhone = requesterOpt.get().getPhone();
                        }
                }

                String donorName = "";
                String donorPhone = "";

                if (request.getAcceptedDonorId() != null) {
                        var donorOpt = userRepository.findById(request.getAcceptedDonorId());
                        if (donorOpt.isPresent()) {
                                donorName = donorOpt.get().getFullName();
                                donorPhone = donorOpt.get().getPhone();
                        }
                }

                return RequestDetailsDto.builder()
                                .patientName(request.getPatientName())
                                .bloodGroup(request.getBloodGroup())
                                .hospitalName(request.getHospitalName())
                                .district(request.getDistrict())
                                .status(request.getStatus())
                                .priorityScore(request.getPriorityScore())
                                .aiRecommendation(request.getAiRecommendation())
                                .requesterName(requesterName)
                                .requesterPhone(requesterPhone)
                                .donorName(donorName)
                                .donorPhone(donorPhone)
                                .build();
    }
}
