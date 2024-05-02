package com.example.demo.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

//import lombok.Value;
import org.springframework.beans.factory.annotation.Value;

@Service
public class JwtUtil {

	 @Value("${jwt.secret}")
	    private String secret;

	    @Value("${jwt.jwtExpirationMs}")
	    private long expirationMs;
	    
	    
	    

    public String generateToken(Authentication authentication) {
    	System.out.println("inside generate token method");
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        String roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", roles) // Add roles as a custom claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    // Other methods...
    
    public Claims validateJwtToken(String jwt) {
        try {
            // Parse the token and extract its claims
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(jwt)
                    .getBody();

            // Check if the token has expired
            if (claims.getExpiration().before(new Date())) {
                throw new JwtException("JWT token has expired");
            }

            return claims;
        } catch (Exception e) {
            throw new JwtException("Invalid JWT token", e);
        }
    }
    
    public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
		String authString = (String) claims.get("roles");
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
		authorities.forEach(System.out::println);
		return authorities;
	}
    
    public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}
}
