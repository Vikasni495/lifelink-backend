package com.lifelink.repository;

import com.lifelink.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByAvailableTrue();

    List<User> findByBloodGroupAndAvailableTrue(
            String bloodGroup
    );

    java.util.List<User> findTop5ByOrderByCreatedAtDesc();
}
