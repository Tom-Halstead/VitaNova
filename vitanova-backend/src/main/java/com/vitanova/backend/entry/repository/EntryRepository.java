package com.vitanova.backend.entry.repository;

import com.vitanova.backend.entry.model.EntryModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EntryRepository extends JpaRepository<EntryModel, Integer> {

    Page<EntryModel> findByCognitoUuid(int userId, Pageable pageable);

    Optional<EntryModel> findByEntryIdAndUserId(int entryId, int userId);


    Page<EntryModel> findByUserId(int userId, Pageable pageable);

}
