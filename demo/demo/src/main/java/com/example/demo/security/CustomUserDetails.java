package com.example.demo.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.model.Employee;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {
        
	
	private Employee user;
   
   
     public CustomUserDetails(Employee user) {
    	 this.user=user;
     }
   

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new 
				SimpleGrantedAuthority(user.getDesig().toString()));
    }
    
   


    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

    // Implement other UserDetails methods as needed

    // For simplicity, other UserDetails methods can be left as stubs or implemented based on your requirements
}
