package com.sanskar.hotelbooking.controller;

import com.sanskar.hotelbooking.exception.ResourceNotFoundException;
import com.sanskar.hotelbooking.models.User;
import com.sanskar.hotelbooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return user;
        } else {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
    }

    // Get user by username
    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return user;
        } else {
            throw new ResourceNotFoundException("User not found with username " + username);
        }
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return user;
        } else {
            throw new ResourceNotFoundException("User not found with email " + email);
        }
    }

    // Update user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        User updatedUser = userService.updateUser(user);
        if (updatedUser != null) {
            return updatedUser;
        } else {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
    }

    // Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            userService.deleteUser(id);
            return "User deleted successfully";
        } else {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
    }
}
