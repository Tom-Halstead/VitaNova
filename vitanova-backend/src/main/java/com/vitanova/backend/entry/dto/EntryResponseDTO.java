package com.vitanova.backend.entry.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntryResponseDTO {
    private int entryId;
    private String text;
    private LocalDate entryDate;
    private int moodPre;
    private int moodPost;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private List<PhotoDTO> photos;
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
}