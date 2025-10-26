package com.sanskar.hotelbooking.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import com.sanskar.hotelbooking.models.User;
import com.sanskar.hotelbooking.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // Load user by email
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // For simplicity, all users have ROLE_USER
        List<GrantedAuthority> authorities = new ArrayList<>();

        // Convert to Spring Security UserDetails
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),      // username
                user.getPassword(),   // password
                authorities           // authorities
        );
    }
}
