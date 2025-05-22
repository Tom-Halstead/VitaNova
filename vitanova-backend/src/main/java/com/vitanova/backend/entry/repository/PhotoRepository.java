package com.vitanova.backend.entry.repository;

import com.vitanova.backend.entry.model.PhotoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<PhotoModel, Integer> {


}
