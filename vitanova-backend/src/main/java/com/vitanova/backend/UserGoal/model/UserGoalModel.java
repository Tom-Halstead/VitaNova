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

    /** This column is populated by the database DEFAULT CURRENT_TIMESTAMP, not updated by application. */
    @Column(name = "created_at", updatable = false, insertable = false)
    private Instant createdAt;

    // ─────────────────────────────────────────────────────────────────────────────
    // NEW FIELDS:
    // ─────────────────────────────────────────────────────────────────────────────

    /** Free‐text reflection & insights entered by the user */
    @Column(name = "reflection_text", columnDefinition = "TEXT")
    private String reflectionText;

    /**
     * When the goal was marked complete.
     * We will set this in application code (Instant.now()) whenever status → COMPLETED.
     */
    @Column(name = "completion_date")
    private Instant completionDate;
}