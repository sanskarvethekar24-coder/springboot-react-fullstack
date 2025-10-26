package com.sanskar.hotelbooking.service;

import com.sanskar.hotelbooking.models.User;

import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User getUserByUsername(String username);

    User getUserByEmail(String email);

    User updateUser(User user);

    void deleteUser(Long id);
}
