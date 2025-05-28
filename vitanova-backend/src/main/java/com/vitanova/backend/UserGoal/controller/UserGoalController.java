package com.vitanova.backend.UserGoal.controller;


import com.vitanova.backend.UserGoal.dto.UserGoalRequestDTO;
import com.vitanova.backend.UserGoal.dto.UserGoalResponseDTO;
import com.vitanova.backend.UserGoal.service.UserGoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class UserGoalController {
    private final UserGoalService userGoalService;

    @GetMapping
    public Page<UserGoalResponseDTO> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal OAuth2User principal
    ) {
        String sub = principal.getAttribute("sub");
        return userGoalService.listGoalsForCurrentUser(page, size, sub);
    }

    @PostMapping
    public ResponseEntity<UserGoalResponseDTO> create(
            @RequestBody UserGoalRequestDTO dto,
            @AuthenticationPrincipal OAuth2User principal
    ) {
        String sub = principal.getAttribute("sub");
        UserGoalResponseDTO created = userGoalService.createGoalForCurrentUser(dto, sub);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public UserGoalResponseDTO update(
            @PathVariable int id,
            @RequestBody UserGoalRequestDTO dto,
            @AuthenticationPrincipal OAuth2User principal
    ) {
        String sub = principal.getAttribute("sub");
        return userGoalService.updateGoalForCurrentUser(id, dto, sub);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable int id,
            @AuthenticationPrincipal OAuth2User principal
    ) {
        String sub = principal.getAttribute("sub");
        userGoalService.deleteGoalForCurrentUser(id, sub);
        return ResponseEntity.noContent().build();
    }
}
