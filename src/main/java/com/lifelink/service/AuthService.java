package com.lifelink.service;

import com.lifelink.dto.LoginRequest;
import com.lifelink.dto.RegisterRequest;
import com.lifelink.entity.User;
import com.lifelink.repository.UserRepository;
import com.lifelink.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exists"
            );
        }

        String role = "USER";
        if (request.getEmail() != null && request.getEmail().equalsIgnoreCase("admin@lifelink.local")) {
            role = "ADMIN";
        }

        User user = User.builder()
            .id(UUID.randomUUID())
            .fullName(request.getFullName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .phone(request.getPhone())
            .bloodGroup(request.getBloodGroup())
            .district(request.getDistrict())
            .role(role)
            .available(true)
            .createdAt(LocalDateTime.now())
            .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public com.lifelink.dto.LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            ));

        System.out.println("Entered Password = " + request.getPassword());
        System.out.println("DB Password = " + user.getPassword());

        if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword())) {

            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            );
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new com.lifelink.dto.LoginResponse(token, user.getRole());
    }
}
