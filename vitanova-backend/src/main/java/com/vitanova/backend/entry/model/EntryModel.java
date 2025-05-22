package com.vitanova.backend.entry.model;


import jakarta.persistence.*;
import lombok.*;

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

}
