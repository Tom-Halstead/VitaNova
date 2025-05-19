package com.vitanova.backend.auth.service;


import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.model.UserModel;
import com.vitanova.backend.auth.repository.UserRepository;
import com.vitanova.backend.exceptions.UserNotFoundException;
import com.vitanova.backend.exceptions.UserServiceException;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {
    private final UserRepository userRepo;
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    /**
     * Finds a UserModel by Cognito UUID or creates a new one if none exists,
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
            UserModel userModel = userRepo.findByCognitoUuid(cognitoUuid)
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
                        UserModel newUserModel = new UserModel();
                        newUserModel.setCognitoUuid(cognitoUuid);
                        newUserModel.setEmail(email);
                        newUserModel.setName(name);
                        return userRepo.save(newUserModel);
                    });

            return UserDTO.userToDto(userModel);

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
