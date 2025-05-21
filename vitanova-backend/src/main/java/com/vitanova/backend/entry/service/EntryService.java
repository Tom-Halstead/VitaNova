package com.vitanova.backend.entry.service;


import com.vitanova.backend.entry.dto.EntryDTO;
import com.vitanova.backend.entry.repository.EntryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class EntryService {
    private final EntryRepository entryRepo;
    public EntryService(EntryRepository entryRepo) {
        this.entryRepo = entryRepo;
    }



    @Transactional
    public EntryDTO getEntryById(int id) {
        return entryRepo.findById(id)
                .map(EntryDTO::fromModel)
                .orElseThrow(() -> new NoSuchElementException("Entry with ID " + id + " not found."));
    }

    public EntryDTO getEntryForUser(int entryId, int userId) {
        return entryRepo.findByEntryIdAndUserId(entryId, userId)
                .map(EntryDTO::fromModel)
                .orElseThrow(() -> new NoSuchElementException("Entry not found or access denied."));
    }
}
