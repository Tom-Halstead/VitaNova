package com.vitanova.backend.entry.controller;


import com.vitanova.backend.auth.service.UserService;
import com.vitanova.backend.entry.dto.EntryDTO;
import com.vitanova.backend.entry.service.EntryService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/entries")
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
}
