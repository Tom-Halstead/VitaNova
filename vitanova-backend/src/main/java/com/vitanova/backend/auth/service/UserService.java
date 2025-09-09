package com.vitanova.backend.auth.service;


import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.model.UserModel;
import com.vitanova.backend.auth.repository.UserRepository;
import com.vitanova.backend.exceptions.UserNotFoundException;
import com.vitanova.backend.exceptions.UserServiceException;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Objects;

@Service
public class UserService {
    private final UserRepository userRepo;
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Transactional
    public UserDTO findOrCreateByCognitoUuidAndProfile(String cognitoUuid, String email, String name) {
        validateCognitoUuid(cognitoUuid);
        UserModel userModel = findOrCreateAndUpdateUser(cognitoUuid, email, name);
        return UserDTO.userToDto(userModel);
    }

    private void validateCognitoUuid(String cognitoUuid) {
        if (cognitoUuid == null || cognitoUuid.trim().isEmpty()) {
            throw new IllegalArgumentException("AWS cognitoUuid creation error. Try again please.");
        }
    }

    private UserModel findOrCreateAndUpdateUser(String cognitoUuid, String email, String name) {
        return userRepo.findByCognitoUuid(cognitoUuid)
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
                    UserModel newUser = new UserModel();
                    newUser.setCognitoUuid(cognitoUuid);
                    newUser.setEmail(email);
                    newUser.setName(name);
                    return userRepo.save(newUser);
                });
    }


    @Transactional
    public void deleteByCognitoUuid(String cognitoUuid) {
        if (cognitoUuid == null || cognitoUuid.trim().isEmpty()) {
            throw new IllegalArgumentException("cognitoUuid must not be null or empty.");
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
                    "Unable to delete user with Cognito UUID" + cognitoUuid, dae
            );
        }
    }

    public int getUserIdByCognitoSub(String cognitoSub) {
        return userRepo.findByCognitoUuid(cognitoSub)
                .map(UserModel::getUserId)
                .orElseThrow(() -> new NoSuchElementException("User not found!"));
    }

    /**
     * Extract the Cognito 'sub' claim (the UUID) from the Jwt,
     * look up the corresponding AppUser, and return its internal ID.
     */
    public int getCurrentUserId(OAuth2User principal) {
        String cognitoUuid = principal.getAttribute("sub"); // 'sub' claim
        return userRepo.findByCognitoUuid(cognitoUuid)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "No user found for Cognito UUID: " + cognitoUuid))
                .getUserId();
    }

    /**
     * Fetch the full UserModel by its numeric ID, or throw if not present.
     */
    public UserModel getUserEntityById(int userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "No user found with ID: " + userId));
    }



}
