package com.example.demo.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private JwtUtil utils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("in JwtAuthenticationFilter dofiltermethod");
		String authHeader = request.getHeader("Authorization");

		
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
		// => req header contains JWT
		System.out.println("in dofilterInternalMethod inside if condition");
        try {
		String jwt = authHeader.substring(7);
		// validate JWT
		Claims payloadClaims = utils.validateJwtToken(jwt);
		//payload means information used to create jwt token such as email
		// get user name from the claims
		String email = utils.getUserNameFromJwtToken(payloadClaims);
		// get granted authorities as a custom claim
		List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(payloadClaims);
		// add username/email n granted authorities in Authentication object
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null,
		authorities);
		// save this auth token under spring sec so that subsequent filters will NOT
		// retry the auth again
		System.out.println("token to be saved : "+token);
		SecurityContextHolder.getContext().setAuthentication(token);
		System.out.println("saved auth token in sec ctx");
        }catch(Exception e) {
        	System.out.println(e.getMessage());
        }

		}
		filterChain.doFilter(request, response);// to continue with remaining chain of spring sec filters
		
	}
	
}