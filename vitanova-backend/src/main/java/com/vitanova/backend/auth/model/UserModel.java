package com.vitanova.backend.auth.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "app_user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "cognito_uuid", unique = true)
    private String cognitoUuid;

    @Column(name = "created_at",
            nullable = false,
            updatable = false,
            insertable = false)
    private Instant createdAt;

}
