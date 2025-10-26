package com.sanskar.hotelbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.sanskar.hotelbooking.security.JwtProvider;
import com.sanskar.hotelbooking.models.User;
import com.sanskar.hotelbooking.repository.UserRepository;
import com.sanskar.hotelbooking.security.AuthRequest;
import com.sanskar.hotelbooking.security.AuthResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    // Signup / Register
    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody User user) throws Exception {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new Exception("This email is already used with another account");
        }

        // Encode password and save user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // Generate JWT immediately after signup
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(savedUser.getEmail(), user.getPassword())
        );
        String token = JwtProvider.generateToken(auth);

        return new AuthResponse(token, "Register Success");
    }

    // Signin / Login
    @PostMapping("/signin")
    public AuthResponse signin(@RequestBody AuthRequest loginRequest) {  // changed here
        // Spring Security handles authentication automatically
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(), loginRequest.getPassword())
        );

        // Generate JWT after successful login
        String token = JwtProvider.generateToken(auth);
        return new AuthResponse(token, "Login Success");
    }
}
