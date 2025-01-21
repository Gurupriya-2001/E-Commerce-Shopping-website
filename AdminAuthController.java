package com.example.demo.controller;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import com.example.demo.service.AdminService;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {

    private static final Logger logger = LoggerFactory.getLogger(AdminAuthController.class);

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdminService adminService; // Ensure you have an AdminService similar to UserService

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            Admin registeredAdmin = adminService.registerAdmin(admin);
            return new ResponseEntity<>(registeredAdmin, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "Admin registration failed"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/log")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        logger.info("Login attempt with username: " + admin.getUsername());

        Optional<Admin> optionalAdmin = adminRepository.findByUsername(admin.getUsername());
        if (optionalAdmin.isPresent() && optionalAdmin.get().getPassword().equals(admin.getPassword())) {
            return ResponseEntity.ok().build();
        } else {
            logger.warn("Invalid login attempt with username: " + admin.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody Admin admin) {
        Optional<Admin> existingAdminOpt = adminRepository.findById(id);
        if (existingAdminOpt.isPresent()) {
            Admin existingAdmin = existingAdminOpt.get();
            existingAdmin.setUsername(admin.getUsername()); // Update fields as needed
            existingAdmin.setPassword(admin.getPassword());
            // Update other fields as needed
            adminRepository.save(existingAdmin);
            return ResponseEntity.ok(existingAdmin);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        Optional<Admin> existingAdminOpt = adminRepository.findById(id);
        if (existingAdminOpt.isPresent()) {
            adminRepository.delete(existingAdminOpt.get());
            return ResponseEntity.ok("Admin deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<?> getAdmin(@PathVariable Long id) {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if (optionalAdmin.isPresent()) {
            return ResponseEntity.ok(optionalAdmin.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }
    }
}
