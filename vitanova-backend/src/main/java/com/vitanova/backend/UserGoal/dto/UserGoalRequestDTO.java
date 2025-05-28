package com.vitanova.backend.UserGoal.dto;

import lombok.Data;

import java.time.LocalDate;


@Data
public class UserGoalRequestDTO {
    private String type;
    private Integer targetValue;
    private LocalDate dueDate;
    private Integer currentValue;
}
