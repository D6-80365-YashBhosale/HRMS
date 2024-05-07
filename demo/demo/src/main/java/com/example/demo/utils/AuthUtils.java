package com.example.demo.utils;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class AuthUtils {
	 public String getUsername() {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        if (authentication == null) {
	            System.out.println("No authentication data found.");
	            return "";
	        }

	        Object principal = authentication.getPrincipal();
	        if (principal instanceof Jwt) {
	            System.out.println("Principal is a JWT token.");
	            Jwt jwt = (Jwt) principal;
	            return jwt.getSubject(); // or jwt.getClaim("preferred_username") if you need a different field
	        } else if (principal instanceof String) {
	            System.out.println("Principal is a String (likely the username).");
	            return (String) principal;
	        } else {
	            System.out.println("Principal is of unknown type: " + principal.getClass());
	            return principal.toString(); // Default or consider throwing an exception
	        }
	    }		
	}

