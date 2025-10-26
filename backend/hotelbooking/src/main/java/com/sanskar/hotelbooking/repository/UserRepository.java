package com.sanskar.hotelbooking.repository;

import com.sanskar.hotelbooking.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Case-insensitive email search (useful for login)
    User findByEmail(String email);

    // Optional: case-insensitive username search
    User findByUsernameIgnoreCase(String username);
}
