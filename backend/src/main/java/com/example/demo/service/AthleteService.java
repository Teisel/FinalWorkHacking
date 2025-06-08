package com.example.demo.service;

import com.example.demo.entity.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AthleteService {
    Iterable<Athlete> findAll();

    Page<Athlete> findAll(Pageable pageable);

    Optional<Athlete> findById(Integer id);

    Athlete save(Athlete us);

    void deleteById(Integer id);
}
