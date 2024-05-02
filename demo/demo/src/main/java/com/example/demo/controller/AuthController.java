package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.request.AuthRequest;
import com.example.demo.response.AuthResponse;
import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.JwtUtil;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest loginRequest) {
        // Authenticate user
        try {
            // Attempt to authenticate user
            System.out.println("inside login method");
            System.out.println("login request object" + loginRequest);
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));
            System.out.println("after authentication successful");

            // Generate JWT token
            String token = jwtUtil.generateToken(authentication);

            // Return response with JWT token
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (BadCredentialsException e) {
            // Handle incorrect credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Incorrect username or password");
        } catch (AuthenticationException e) {
            // Handle other authentication-related errors
        	e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage() );
        } catch (Exception e) {
            // Handle other types of exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
