package com.vitanova.backend.auth.service;


import com.vitanova.backend.auth.dto.UserDTO;
import com.vitanova.backend.auth.model.User;
import com.vitanova.backend.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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
    public UserDTO findOrCreateByCognitoUuid(String cognitoUuid) {
        User user = userRepo.findByCognitoUuid(cognitoUuid)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setCognitoUuid(cognitoUuid);
                    return userRepo.save(newUser);
                });
        return UserDTO.userToDto(user);
    }

}
