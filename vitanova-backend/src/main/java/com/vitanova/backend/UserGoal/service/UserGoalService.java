package com.vitanova.backend.UserGoal.service;

import com.vitanova.backend.UserGoal.dto.UserGoalRequestDTO;
import com.vitanova.backend.UserGoal.dto.UserGoalResponseDTO;
import com.vitanova.backend.UserGoal.model.UserGoalModel;
import com.vitanova.backend.UserGoal.repository.UserGoalRepository;
import com.vitanova.backend.auth.model.UserModel;
import com.vitanova.backend.auth.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class UserGoalService {
        private final UserGoalRepository userGoalRepo;
        private final UserService userService;



        private final Function<UserGoalModel, UserGoalResponseDTO> TO_DTO = g -> {
                UserGoalResponseDTO dto = new UserGoalResponseDTO();
                dto.setGoalId(g.getGoalId());
                dto.setType(g.getType());
                dto.setTargetValue(g.getTargetValue());
                dto.setCurrentValue(g.getCurrentValue());
                dto.setDueDate(g.getDueDate());
                dto.setStatus(g.getStatus());
                dto.setCreatedAt(g.getCreatedAt());
                return dto;
        };

        @Transactional
        public Page<UserGoalResponseDTO> listGoalsForCurrentUser(int page, int size, String cognitoSub) {
                int userId = userService.getUserIdByCognitoSub(cognitoSub);
                Pageable pg = PageRequest.of(page, size, Sort.by("createdAt").descending());
                return userGoalRepo.findByUserUserId(userId, pg).map(TO_DTO);
        }

        @Transactional
        public UserGoalResponseDTO createGoalForCurrentUser(UserGoalRequestDTO req, String cognitoSub) {
                int userId = userService.getUserIdByCognitoSub(cognitoSub);
                UserModel user = userService.getUserEntityById(userId);

                UserGoalModel goal = new UserGoalModel();
                goal.setUser(user);
                goal.setType(req.getType());
                goal.setTargetValue(req.getTargetValue());
                goal.setCurrentValue(req.getCurrentValue() != null ? req.getCurrentValue() : 0);
                goal.setDueDate(req.getDueDate());

                UserGoalModel saved = userGoalRepo.save(goal);
                return TO_DTO.apply(saved);
        }

        @Transactional
        public UserGoalResponseDTO updateGoalForCurrentUser(int goalId, UserGoalRequestDTO req, String cognitoSub) {
                int userId = userService.getUserIdByCognitoSub(cognitoSub);
                UserGoalModel goal = userGoalRepo.findById(goalId)
                        .filter(g -> g.getUser().getUserId() == userId)
                        .orElseThrow(() -> new IllegalArgumentException("No such goal"));
                if (req.getType() != null)        goal.setType(req.getType());
                if (req.getTargetValue() != null) goal.setTargetValue(req.getTargetValue());
                if (req.getCurrentValue() != null)goal.setCurrentValue(req.getCurrentValue());
                if (req.getDueDate() != null)     goal.setDueDate(req.getDueDate());

                UserGoalModel updated = userGoalRepo.save(goal);
                return TO_DTO.apply(updated);
        }

        @Transactional
        public void deleteGoalForCurrentUser(int goalId, String cognitoSub) {
                int userId = userService.getUserIdByCognitoSub(cognitoSub);
                UserGoalModel goal = userGoalRepo.findById(goalId)
                        .filter(g -> g.getUser().getUserId() == userId)
                        .orElseThrow(() -> new IllegalArgumentException("No such goal"));
                userGoalRepo.delete(goal);
        }

    }

