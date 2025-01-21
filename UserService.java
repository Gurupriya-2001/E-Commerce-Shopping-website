package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) throws Exception {
        // Check if the user already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new Exception("User already exists");
        }

        // Save the new user
        return userRepository.save(user);
    }
}
