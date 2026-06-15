package com.lifelink.controller;

import com.lifelink.dto.CreateBloodRequestDto;
import com.lifelink.dto.RequestDetailsDto;
import com.lifelink.dto.DonorMatchDto;
import com.lifelink.service.BloodRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class BloodRequestController {

    private final BloodRequestService bloodRequestService;

    @PostMapping("/create")
    public String createRequest(
            @RequestBody CreateBloodRequestDto request,
            Authentication authentication
    ) {

        return bloodRequestService.createRequest(request, authentication.getName());
    }

    @GetMapping("/all")
    public List<?> getAllRequests() {
        return bloodRequestService.getAllRequests();
    }

    @GetMapping("/match/{requestId}")
    public List<?> findMatchingDonors(
            @PathVariable UUID requestId
    ) {
        return bloodRequestService.findMatchingDonors(requestId);
    }

    @PutMapping("/accept/{requestId}")
    public String acceptRequest(
            @PathVariable UUID requestId,
            Authentication authentication
    ) {
        return bloodRequestService.acceptRequest(
                requestId,
                authentication.getName()
        );
    }

    @GetMapping("/my-requests")
    public List<?> myRequests(Authentication authentication) {
        return bloodRequestService.myRequests(authentication.getName());
    }

    @GetMapping("/details/{requestId}")
    public RequestDetailsDto getRequestDetails(
            @PathVariable UUID requestId
    ) {

        return bloodRequestService
                .getRequestDetails(requestId);
    }

    @GetMapping("/{id}/recommended-donors")
    public List<DonorMatchDto> getRecommendedDonors(
            @PathVariable UUID id
    ) {
        return bloodRequestService.getRecommendedDonors(id);
    }

    @GetMapping("/accepted")
    public List<?> myAcceptedRequests(
            Authentication authentication
    ) {

        return bloodRequestService
                .myAcceptedRequests(
                        authentication.getName()
                );
    }

    @GetMapping("/test")
    public String test() {
        return "Working";
    }
}
