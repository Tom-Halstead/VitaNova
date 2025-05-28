package com.vitanova.backend.entry.repository;

import com.vitanova.backend.entry.model.EntryModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EntryRepository extends JpaRepository<EntryModel, Integer> {


    Optional<EntryModel> findByEntryIdAndUserId(int entryId, int userId);

    @Modifying
    @Query("DELETE FROM EntryModel e WHERE e.entryId = :entryId AND e.userId = :userId")
    int deleteByEntryIdAndUserId(int entryId, int userId);

    Page<EntryModel> findByUserId(int userId, Pageable pageable);

}
