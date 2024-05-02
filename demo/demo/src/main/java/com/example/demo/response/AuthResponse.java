package com.example.demo.response;



public class AuthResponse {
    private String jwt;

    public AuthResponse(String jwt) {
        this.jwt = jwt;
    }

    // Getters
    public String getJwt() {
        return jwt;
    }
}
