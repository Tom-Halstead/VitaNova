package com.vitanova.backend.entry.model;


import jakarta.persistence.*;
import lombok.*;
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
    private Long entryId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "text", nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;

    @Column(name = "mood_pre", nullable = false)
    private Integer moodPre;

    @Column(name = "mood_post", nullable = false)
    private Integer moodPost;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

}
