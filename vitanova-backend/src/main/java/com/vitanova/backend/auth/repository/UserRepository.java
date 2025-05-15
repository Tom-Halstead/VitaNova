package com.vitanova.backend.auth.repository;


import com.vitanova.backend.auth.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByCognitoUuid(String cognitoUuid);
    @Modifying
    int deleteByCognitoUuid(String cognitoUuid);
}
