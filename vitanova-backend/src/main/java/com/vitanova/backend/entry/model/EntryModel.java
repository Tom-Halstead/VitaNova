package com.vitanova.backend.entry.model;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "entry")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "entry_id")
    private int entryId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "text", nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;

    @Column(name = "mood_pre", nullable = false)
    private int moodPre;

    @Column(name = "mood_post", nullable = false)
    private int moodPost;

    @Column(name = "created_at",
            nullable = false,
            updatable = false,
            insertable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // ── NEW ACTIVITY FIELDS (nullable) ──

    @Column(name = "activity_type")
    private String activityType;

    @Column(name = "duration_min")
    private Integer durationMin;

    @Column(name = "distance")
    private BigDecimal distance;

    @Column(name = "distance_unit")
    private String distanceUnit;

    @Column(name = "calories")
    private Integer calories;

    @Column(name = "location")
    private String location;

    @Column(name = "avg_heart_rate")
    private Integer avgHeartRate;

    @Column(name = "max_heart_rate")
    private Integer maxHeartRate;

    @Column(name = "equipment")
    private String equipment;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

}