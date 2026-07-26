package com.civicpulse.backend.dto;

import com.civicpulse.backend.entity.Role;

public class AuthResponse {

    private String message;
    private boolean success;

    private String name;
    private String email;
    private Role role;

    public AuthResponse() {
    }

    // Register Response
    public AuthResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    // Login Response
    public AuthResponse(String message,
                        boolean success,
                        String name,
                        String email,
                        Role role) {

        this.message = message;
        this.success = success;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}