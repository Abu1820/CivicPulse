package com.civicpulse.backend.service;

import org.springframework.stereotype.Service;

import com.civicpulse.backend.dto.AuthResponse;
import com.civicpulse.backend.dto.LoginRequest;
import com.civicpulse.backend.dto.RegisterRequest;
import com.civicpulse.backend.entity.User;
import com.civicpulse.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email already exists", false);
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("USER");

        userRepository.save(user);

        return new AuthResponse("Registration Successful", true);
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new AuthResponse("User not found", false);
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse("Invalid password", false);
        }

        return new AuthResponse("Login Successful", true);
    }
}