package com.vitanova.backend.entry.repository;

import com.vitanova.backend.entry.model.EntryModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EntryRepository extends JpaRepository<EntryModel, Integer> {

    Optional<EntryModel> findById(int id);

    Optional<EntryModel> findByEntryIdAndUserId(int entryId, int userId);
}
