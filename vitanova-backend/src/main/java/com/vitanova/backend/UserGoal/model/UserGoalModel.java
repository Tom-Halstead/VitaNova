package com.vitanova.backend.UserGoal.model;

import com.vitanova.backend.auth.model.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "user_goal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGoalModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id")
    private Integer goalId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private UserModel user;

    @Column(name = "type", length = 50, nullable = false)
    private String type;

    @Column(name = "target_value", nullable = false)
    private Integer targetValue;

    @Column(name = "current_value", nullable = false)
    private Integer currentValue = 0;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "status", length = 20, nullable = false)
    private String status = "ACTIVE";

    @Column(name = "created_at", updatable = false, insertable = false)
    private Instant createdAt;
}
