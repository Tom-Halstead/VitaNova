package com.vitanova.backend.entry.model;

import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "photo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotoModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int photoId;
    private int entryId;
    private String url;
    private OffsetDateTime uploadedAt;
}
