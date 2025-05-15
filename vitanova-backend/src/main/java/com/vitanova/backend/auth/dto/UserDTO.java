package com.vitanova.backend.auth.dto;

import com.vitanova.backend.auth.model.UserModel;
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
     * Converts a UserModel entity into a UserDTO.
     * @param userModel the UserModel entity
     * @return a new UserDTO populated with fields from the entity
     */
    public static UserDTO userToDto(UserModel userModel) {
        UserDTO dto = new UserDTO();
        dto.setUserId(userModel.getUserId());
        dto.setEmail(userModel.getEmail());
        dto.setName(userModel.getName());
        dto.setCognitoUuid(userModel.getCognitoUuid());
        dto.setCreatedAt(userModel.getCreatedAt());
        return dto;
    }

}
