package com.example.demo.service;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    /**
     * Registers a new admin by saving them to the database.
     *
     * @param admin The admin to be registered.
     * @return The registered admin.
     */
    public Admin registerAdmin(Admin admin) {
        // You can add additional logic here, e.g., password encoding
        return adminRepository.save(admin);
    }

    /**
     * Retrieves an admin by their username.
     *
     * @param username The username of the admin.
     * @return An Optional containing the admin if found, otherwise empty.
     */
    public Optional<Admin> getAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    /**
     * Retrieves an admin by their ID.
     *
     * @param id The ID of the admin.
     * @return An Optional containing the admin if found, otherwise empty.
     */
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    /**
     * Updates the details of an existing admin.
     *
     * @param admin The admin with updated details.
     * @return The updated admin.
     */
    public Admin updateAdmin(Admin admin) {
        // Make sure the admin exists before updating
        if (adminRepository.existsById(admin.getId())) {
            return adminRepository.save(admin);
        } else {
            throw new RuntimeException("Admin not found");
        }
    }

    /**
     * Deletes an admin by their ID.
     *
     * @param id The ID of the admin to be deleted.
     */
    public void deleteAdmin(Long id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
        } else {
            throw new RuntimeException("Admin not found");
        }
    }
}
