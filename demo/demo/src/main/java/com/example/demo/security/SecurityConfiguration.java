package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	JwtAuthenticationFilter jwtAuthenticationFilter;
	
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		System.out.println("in securityconfig filterchain");
		http.
		csrf()
		.disable().
		authorizeRequests()
		 .requestMatchers("/department","/login").permitAll()
         .requestMatchers("/leave/**").hasAnyAuthority("Manager", "Hr")  // Access to /leave for Manager and Hr
         .requestMatchers("/employees/**").hasAnyAuthority("Manager", "Hr") // General access to /employees for Manager and Hr
		.anyRequest().authenticated()
            .and()
                .logout()
                    .permitAll()
            .and()
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        System.out.println("after jwtauthenticationfilter ");
        return http.build();
    }
}
