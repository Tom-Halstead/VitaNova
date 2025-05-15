package com.vitanova.backend.entry.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntryDTO {

    private Long entryId;
    private Long userId;
    private String text;
    private LocalDate entryDate;
    private Integer moodPre;
    private Integer moodPost;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

}
