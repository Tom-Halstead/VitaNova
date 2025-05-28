package com.vitanova.backend.entry.service;


import com.vitanova.backend.auth.model.UserModel;
import com.vitanova.backend.auth.repository.UserRepository;
import com.vitanova.backend.entry.dto.EntryDTO;
import com.vitanova.backend.entry.dto.EntryResponseDTO;
import com.vitanova.backend.entry.dto.PhotoDTO;
import com.vitanova.backend.entry.model.EntryModel;
import com.vitanova.backend.entry.model.PhotoModel;
import com.vitanova.backend.entry.repository.EntryRepository;
import com.vitanova.backend.entry.repository.PhotoRepository;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class EntryService {
    private final EntryRepository entryRepo;
    private final PhotoRepository photoRepo;
    private final UserRepository userRepo;



    public EntryService(EntryRepository entryRepo, PhotoRepository photoRepo, UserRepository userRepo) {
        this.entryRepo = entryRepo;
        this.photoRepo = photoRepo;
        this.userRepo = userRepo;
    }


    @Transactional
    public Page<EntryDTO> getEntriesForUser(String cognitoUuid, int page, int size) {
        // 1) Find your app’s UserModel by Cognito “sub”
        UserModel user = userRepo.findByCognitoUuid(cognitoUuid)
                .orElseThrow(() -> new NoSuchElementException(
                        "No app user for Cognito UUID=" + cognitoUuid));

        // 2) Use the internal userId to page entries
        Pageable pageable = PageRequest.of(page, size,
                Sort.by("entryDate").descending());

        return entryRepo
                .findByUserId(user.getUserId(), pageable)   // <— correct method here
                .map(EntryDTO::fromModel);
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



    @Transactional
    public void deleteEntryForUser(int entryId, String cognitoUuid) {
        var user = userRepo.findByCognitoUuid(cognitoUuid)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        int deleted = entryRepo.deleteByEntryIdAndUserId(entryId, user.getUserId());
        if (deleted == 0) {
            throw new NoSuchElementException("Entry not found or access denied.");
        }
    }



        private String uploadFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IOException("Cannot upload empty file.");
        }
        return "https://yourcdn.com/uploads/" + file.getOriginalFilename();
    }

}
