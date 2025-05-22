package com.vitanova.backend.entry.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
@Getter
@Setter
public class EntryResponseDTO {
    private int entryId;
    private String text;
    private LocalDate entryDate;
    private int moodPre;
    private int moodPost;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private List<PhotoDTO> photos;

    public EntryResponseDTO() { }

    // Getters & setters


}
