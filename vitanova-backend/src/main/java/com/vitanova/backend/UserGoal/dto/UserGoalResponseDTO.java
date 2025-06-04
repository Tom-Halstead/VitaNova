package com.vitanova.backend.UserGoal.dto;

import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public class UserGoalResponseDTO {
    private Integer goalId;
    private String type;
    private Integer targetValue;
    private Integer currentValue;
    private LocalDate dueDate;
    private String status;
    private Instant createdAt;
    private Instant completionDate;
    private String reflectionText;
}
