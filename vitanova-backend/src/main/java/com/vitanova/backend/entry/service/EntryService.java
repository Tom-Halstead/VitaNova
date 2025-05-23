package com.vitanova.backend.entry.service;


import com.vitanova.backend.entry.dto.EntryDTO;
import com.vitanova.backend.entry.dto.EntryResponseDTO;
import com.vitanova.backend.entry.dto.PhotoDTO;
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
import java.util.ArrayList;
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
    public EntryResponseDTO createEntryWithPhotos(EntryDTO entryDto,
                                                  List<MultipartFile> photos,
                                                  int userId) {
        try {
            // 1) persist the entry
            EntryModel entry = new EntryModel();
            entry.setUserId(userId);
            entry.setText(entryDto.getText());
            entry.setEntryDate(entryDto.getEntryDate());
            entry.setMoodPre(entryDto.getMoodPre());
            entry.setMoodPost(entryDto.getMoodPost());
            entry.setCreatedAt(OffsetDateTime.now());
            entry.setUpdatedAt(OffsetDateTime.now());
            EntryModel savedEntry = entryRepo.save(entry);

            // 2) handle optional photos
            List<PhotoDTO> photoDtos = new ArrayList<>();
            if (photos != null && !photos.isEmpty()) {
                for (MultipartFile file : photos) {
                    if (file.isEmpty()) continue;

                    // may throw IOException
                    String uploadedUrl = uploadFile(file);

                    PhotoModel photo = new PhotoModel();
                    photo.setEntryId(savedEntry.getEntryId());
                    photo.setUrl(uploadedUrl);
                    photo.setUploadedAt(OffsetDateTime.now());

                    try {
                        photoRepo.save(photo);
                    } catch (DataAccessException dae) {
                        throw new IllegalStateException(
                                "Failed to save photo metadata: " + file.getOriginalFilename(), dae);
                    }

                    photoDtos.add(new PhotoDTO(photo.getPhotoId(), uploadedUrl));
                }
            }

            // 3) build and return the response DTO
            EntryResponseDTO response = new EntryResponseDTO();
            response.setEntryId(savedEntry.getEntryId());
            response.setText(savedEntry.getText());
            response.setEntryDate(savedEntry.getEntryDate());
            response.setMoodPre(savedEntry.getMoodPre());
            response.setMoodPost(savedEntry.getMoodPost());
            response.setCreatedAt(savedEntry.getCreatedAt());
            response.setUpdatedAt(savedEntry.getUpdatedAt());
            response.setPhotos(photoDtos);
            return response;

        } catch (IOException io) {
            throw new IllegalStateException("Error uploading one of the photos", io);

        } catch (DataAccessException db) {
            throw new IllegalStateException("Database error while saving entry or photos", db);

        } catch (Exception ex) {
            throw new IllegalStateException("Unexpected error in createEntryWithPhotos", ex);
        }
    }




        private String uploadFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IOException("Cannot upload empty file.");
        }
        return "https://yourcdn.com/uploads/" + file.getOriginalFilename();
    }

}
