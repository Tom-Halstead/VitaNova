package com.vitanova.backend.entry.controller;


import com.vitanova.backend.auth.service.UserService;
import com.vitanova.backend.entry.dto.EntryDTO;
import com.vitanova.backend.entry.service.EntryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/{id}")
    public EntryDTO getEntry(@PathVariable int id, @AuthenticationPrincipal OAuth2User principal) {
        String cognitoSub = principal.getAttribute("sub");
        int userId = userService.getUserIdByCognitoSub(cognitoSub);
        return entryService.getEntryForUser(id, userId);
    }

    @PostMapping
    public ResponseEntity<String> createEntry(
            @ModelAttribute EntryDTO entryDto,
            @RequestParam("photos[]") List<MultipartFile> photos,
            @RequestParam("userId") int userId
    ) {
        try {
            entryService.createEntryWithPhotos(entryDto, photos, userId);
            return ResponseEntity.ok("Entry created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create entry: " + e.getMessage());
        }
    }

}
