package com.lifelink.controller;

import com.lifelink.dto.DashboardStatsDto;
import com.lifelink.dto.ProfileDto;
import com.lifelink.dto.UpdateProfileDto;
import com.lifelink.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ProfileDto getProfile(
            Authentication authentication
    ) {

        return userService.getProfile(
                authentication.getName()
        );
    }

    @PutMapping("/profile")
    public String updateProfile(
            @RequestBody UpdateProfileDto request,
            Authentication authentication
    ) {

        return userService.updateProfile(
                authentication.getName(),
                request
        );
    }

    @GetMapping("/dashboard-stats")
    public DashboardStatsDto dashboardStats(
            Authentication authentication
    ) {
        return userService.getDashboardStats(
                authentication.getName()
        );
    }
}
