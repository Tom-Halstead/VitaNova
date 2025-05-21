package com.vitanova.backend.entry.dto;


import com.vitanova.backend.entry.model.EntryModel;
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


    public static EntryDTO fromModel(EntryModel model) {
        EntryDTO dto = new EntryDTO();
        dto.setEntryId(model.getEntryId());
        dto.setUserId(model.getUserId());
        dto.setText(model.getText());
        dto.setEntryDate(model.getEntryDate());
        dto.setMoodPre(model.getMoodPre());
        dto.setMoodPost(model.getMoodPost());
        dto.setCreatedAt(model.getCreatedAt());
        dto.setUpdatedAt(model.getUpdatedAt());
        return dto;
    }

}
