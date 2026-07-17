package com.civicpulse.backend.dto;

public class AuthResponse {

    private String message;
    private boolean success;

    public AuthResponse() {
    }

    public AuthResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}