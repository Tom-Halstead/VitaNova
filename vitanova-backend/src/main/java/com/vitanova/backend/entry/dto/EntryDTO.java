package com.vitanova.backend.entry.dto;


import com.vitanova.backend.entry.model.EntryModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntryDTO {

    private int entryId;
    private int userId;
    private String text;
    private LocalDate entryDate;
    private Integer moodPre;
    private Integer moodPost;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    // ── NEW FIELDS FOR ACTIVITY ──
    private String activityType;
    private Integer durationMin;
    private BigDecimal distance;
    private String distanceUnit;
    private Integer calories;
    private String location;
    private Integer avgHeartRate;
    private Integer maxHeartRate;
    private String equipment;
    private String notes;

    public static EntryDTO fromModel(EntryModel model) {
        return EntryDTO.builder()
                .entryId(model.getEntryId())
                .userId(model.getUserId())
                .text(model.getText())
                .entryDate(model.getEntryDate())
                .moodPre(model.getMoodPre())
                .moodPost(model.getMoodPost())
                .createdAt(model.getCreatedAt())
                .updatedAt(model.getUpdatedAt())
                .activityType(model.getActivityType())
                .durationMin(model.getDurationMin())
                .distance(model.getDistance())
                .distanceUnit(model.getDistanceUnit())
                .calories(model.getCalories())
                .location(model.getLocation())
                .avgHeartRate(model.getAvgHeartRate())
                .maxHeartRate(model.getMaxHeartRate())
                .equipment(model.getEquipment())
                .notes(model.getNotes())
                .build();
    }
}
