package com.vitanova.backend.auth.service;


import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.model.User;
import com.vitanova.backend.auth.repository.UserRepository;
import com.vitanova.backend.exceptions.UserNotFoundException;
import com.vitanova.backend.exceptions.UserServiceException;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataAccessException;
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
        if (cognitoUuid == null || cognitoUuid.trim().isEmpty()) {
            throw new IllegalArgumentException("cognitoUuid must not be null or empty");
        }

        try {
            User user = userRepo.findByCognitoUuid(cognitoUuid)
                    .map(existing -> {
                        if (!Objects.equals(existing.getEmail(), email)
                                || !Objects.equals(existing.getName(), name)) {
                            existing.setEmail(email);
                            existing.setName(name);
                            return userRepo.save(existing);
                        }
                        return existing;
                    })
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setCognitoUuid(cognitoUuid);
                        newUser.setEmail(email);
                        newUser.setName(name);
                        return userRepo.save(newUser);
                    });

            return UserDTO.userToDto(user);

        } catch (DataAccessException dae) {
            throw new UserServiceException(
                    "Unable to find or create user with Cognito UUID " + cognitoUuid, dae
            );
        }
    }

    @Transactional
    public void deleteByCognitoUuid(String cognitoUuid) {
        if (cognitoUuid == null || cognitoUuid.trim().isEmpty()) {
            throw new IllegalArgumentException("cognitoUuid must not be null or empty");
        }

        try {
            int deletedCount = userRepo.deleteByCognitoUuid(cognitoUuid);
            if (deletedCount == 0) {
                throw new UserNotFoundException(
                        "No user with Cognito UUID " + cognitoUuid + " was found"
                );
            }
        } catch (DataAccessException dae) {
            throw new UserServiceException(
                    "Unable to delete user with Cognito UUID " + cognitoUuid, dae
            );
        }
    }






}
