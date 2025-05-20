package com.vitanova.backend.entry.repository;

import com.vitanova.backend.entry.model.EntryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntryRepository extends JpaRepository<EntryModel, Integer> {
}
