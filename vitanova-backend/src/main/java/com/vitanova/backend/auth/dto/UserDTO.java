package com.vitanova.backend.auth.dto;

import com.vitanova.backend.auth.model.User;

import java.time.Instant;

public class UserDTO {
    private Long userId;
    private String email;
    private String name;
    private String cognitoUuid;
    private Instant createdAt;

    /**
     * Converts a User entity into a UserDTO.
     * @param user the User entity
     * @return a new UserDTO populated with fields from the entity
     */
    public static UserDTO userToDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setCognitoUuid(user.getCognitoUuid());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }
    // Getters and setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCognitoUuid() {
        return cognitoUuid;
    }

    public void setCognitoUuid(String cognitoUuid) {
        this.cognitoUuid = cognitoUuid;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
