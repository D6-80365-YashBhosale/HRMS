package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.Employee;
import com.example.demo.repo.IEmployeeRespository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private IEmployeeRespository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	System.out.println("inside loadbyUsername method");
        Employee employee = employeeRepository.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        System.out.println("Employee object "+employee);
        // Create UserDetails object from Employee data
        return new CustomUserDetails(employee);
    }
}