package com.example.demo.service;

import com.example.demo.entity.Competitor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CompetitorService {
    Iterable<Competitor> findAll();

    Page<Competitor> findAll(Pageable pageable);

    Optional<Competitor> findById(Integer id);

    Competitor save(Competitor competitor);

    void deleteById(Integer id);

    List<Competitor> getCompetitors(Integer idCategory);

    List<Competitor> findTourneyCompetitors(Integer idTourney);
}

