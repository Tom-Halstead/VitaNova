package com.vitanova.backend.auth.repository;


import com.vitanova.backend.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByCognitoUuid(String cognitoUuid);
    void deleteByCognitoUuid(String cognitoUuid);
}
