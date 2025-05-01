package com.vitanova.backend.auth.service;


import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.model.User;
import com.vitanova.backend.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepo;
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    /**
     * Finds a User by Cognito UUID or creates a new one if none exists,
     * then returns its UserDTO representation.
     */
    @Transactional
    public UserDTO findOrCreateByCognitoUuidAndProfile(
            String cognitoUuid,
            String email,
            String name
    ) {
        User user = userRepo.findByCognitoUuid(cognitoUuid)
                .map(existing -> {
                    // Optional: keep profile up-to-date
                    if (!Objects.equals(existing.getEmail(), email) ||
                            !Objects.equals(existing.getName(),  name)) {
                        existing.setEmail(email);
                        existing.setName(name);
                        return userRepo.save(existing);
                    }
                    return existing;
                })
                .orElseGet(() -> {
                    // New user: set all the things!
                    User newUser = new User();
                    newUser.setCognitoUuid(cognitoUuid);
                    newUser.setEmail(email);
                    newUser.setName(name);
                    return userRepo.save(newUser);
                });

        return UserDTO.userToDto(user);
    }

}
