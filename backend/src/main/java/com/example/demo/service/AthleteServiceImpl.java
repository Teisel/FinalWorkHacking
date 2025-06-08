package com.example.demo.service;

import com.example.demo.entity.Athlete;
import com.example.demo.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AthleteServiceImpl implements AthleteService {
    @Autowired
    private AthleteRepository athleteRepository;

    public AthleteServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Athlete> findAll() {
        return this.athleteRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Athlete> findAll(Pageable pageable) {
        return this.athleteRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<Athlete> findById(Integer id) {
        return this.athleteRepository.findById(id);
    }

    @Transactional
    public Athlete save(Athlete athlete) {
        return (Athlete)this.athleteRepository.save(athlete);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.athleteRepository.deleteById(id);
    }
}

