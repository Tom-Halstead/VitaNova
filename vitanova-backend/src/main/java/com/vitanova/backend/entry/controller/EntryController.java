package com.vitanova.backend.entry.controller;

import com.vitanova.backend.auth.service.UserService;
import com.vitanova.backend.entry.dto.EntryDTO;
import com.vitanova.backend.entry.dto.EntryResponseDTO;
import com.vitanova.backend.entry.service.EntryService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EntryController {

    private final EntryService entryService;
    private final UserService userService;

    public EntryController(EntryService entryService, UserService userService) {
        this.entryService = entryService;
        this.userService = userService;
    }


    @GetMapping
    public Page<EntryDTO> listEntries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal OAuth2User principal
    ) {
        String cognitoUuid = principal.getAttribute("sub");
        return entryService.getEntriesForUser(cognitoUuid, page, size);
    }


    @GetMapping("/{id}")
    public EntryDTO getEntry(@PathVariable int id, @AuthenticationPrincipal OAuth2User principal) {
        String cognitoSub = principal.getAttribute("sub");
        int userId = userService.getUserIdByCognitoSub(cognitoSub);
        return entryService.getEntryForUser(id, userId);
    }

    @PostMapping
    public ResponseEntity<EntryResponseDTO> createEntry(
            @ModelAttribute EntryDTO dto,
            @RequestParam(name = "photos[]", required = false) List<MultipartFile> photos,
            @AuthenticationPrincipal OAuth2User principal
    ) {
        try {
            int userId = userService.getCurrentUserId(principal);
            EntryResponseDTO created = entryService.createEntryWithPhotos(dto, photos, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);

        } catch (UsernameNotFoundException ex) {
            // Token was valid but no matching user in our DB
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();

        } catch (IllegalStateException ex) {
            // Something went wrong in service (e.g. photo upload or save failed)
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);

        } catch (Exception ex) {
            // Fallback for any other unexpected error
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


}
