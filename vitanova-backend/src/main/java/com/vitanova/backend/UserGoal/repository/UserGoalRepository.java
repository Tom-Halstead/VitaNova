package com.vitanova.backend.UserGoal.repository;

import com.vitanova.backend.UserGoal.model.UserGoalModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGoalRepository extends JpaRepository<UserGoalModel, Integer> {
    Page<UserGoalModel> findByUser_UserId(Integer userId, Pageable pageable);
}


