package com.vitanova.backend.entry.service;


import com.vitanova.backend.entry.repository.EntryRepository;
import org.springframework.stereotype.Service;

@Service
public class EntryService {
    private final EntryRepository entryRepo;
    public EntryService(EntryRepository entryRepo) {
        this.entryRepo = entryRepo;
    }
}
