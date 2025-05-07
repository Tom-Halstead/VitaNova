package com.vitanova.backend.auth.dto;

import com.vitanova.backend.auth.model.User;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class UserDTO {
    // Getters and setters
    private Long userId;
    private String email;
    private String name;
    private String cognitoUuid;
    private Instant createdAt;

    public UserDTO(String email, String name) {
    }

    public UserDTO(){}

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

}
