package com.vitanova.backend.entry.service;


import com.vitanova.backend.entry.dto.EntryDTO;
import com.vitanova.backend.entry.model.EntryModel;
import com.vitanova.backend.entry.model.PhotoModel;
import com.vitanova.backend.entry.repository.EntryRepository;
import com.vitanova.backend.entry.repository.PhotoRepository;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EntryService {
    private final EntryRepository entryRepo;
    private final PhotoRepository photoRepo;

    public EntryService(EntryRepository entryRepo, PhotoRepository photoRepo) {
        this.entryRepo = entryRepo;
        this.photoRepo = photoRepo;
    }



    @Transactional
    public EntryDTO getEntryById(int id) {
        return entryRepo.findById(id)
                .map(EntryDTO::fromModel)
                .orElseThrow(() -> new NoSuchElementException("Entry with ID " + id + " not found."));
    }

    @Transactional
    public EntryDTO getEntryForUser(int entryId, int userId) {
        return entryRepo.findByEntryIdAndUserId(entryId, userId)
                .map(EntryDTO::fromModel)
                .orElseThrow(() -> new NoSuchElementException("Entry not found or access denied."));
    }


    @Transactional
    public void createEntryWithPhotos(EntryDTO entryDto, List<MultipartFile> photos, int userId) {
        try {
            // Save entry to DB
            EntryModel entry = new EntryModel();
            entry.setUserId(userId);
            entry.setText(entryDto.getText());
            entry.setEntryDate(entryDto.getEntryDate());
            entry.setMoodPre(entryDto.getMoodPre());
            entry.setMoodPost(entryDto.getMoodPost());
            entry.setCreatedAt(OffsetDateTime.now());
            entry.setUpdatedAt(OffsetDateTime.now());

            EntryModel savedEntry = entryRepo.save(entry);

            // Handle optional photos
            if (photos != null && !photos.isEmpty()) {
                for (MultipartFile file : photos) {
                    if (file.isEmpty()) continue;

                    // uploadFile() now throws IOException
                    String uploadedUrl = uploadFile(file);

                    PhotoModel photo = new PhotoModel();
                    photo.setEntryId(savedEntry.getEntryId());
                    photo.setUrl(uploadedUrl);
                    photo.setUploadedAt(OffsetDateTime.now());

                    try {
                        photoRepo.save(photo);
                    } catch (Exception e) {
                        throw new IllegalStateException("Failed to save photo metadata for: " + file.getOriginalFilename(), e);
                    }
                }
            }

        } catch (DataAccessException e) {
            throw new IllegalStateException("Database error while creating journal entry", e);
        } catch (IOException e) {
            throw new IllegalStateException("Error occurred while uploading photo", e);
        } catch (Exception e) {
            throw new IllegalStateException("Unexpected error while creating journal entry", e);
        }
    }


    private String uploadFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IOException("Cannot upload empty file.");
        }
        return "https://yourcdn.com/uploads/" + file.getOriginalFilename();
    }

}
