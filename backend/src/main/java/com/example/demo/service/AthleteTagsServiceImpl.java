package com.example.demo.service;

import com.example.demo.entity.AthleteTags;
import com.example.demo.repository.AthleteTagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AthleteTagsServiceImpl implements AthleteTagsService {
    @Autowired
    private AthleteTagsRepository athleteTagsRepository;

    public AthleteTagsServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<AthleteTags> findAll() {
        return this.athleteTagsRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<AthleteTags> findAll(Pageable pageable) {
        return this.athleteTagsRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<AthleteTags> findById(Integer id) {
        return this.athleteTagsRepository.findById(id);
    }

    @Transactional
    public AthleteTags save(AthleteTags athleteTags) {
        return (AthleteTags)this.athleteTagsRepository.save(athleteTags);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.athleteTagsRepository.deleteById(id);
    }
}

