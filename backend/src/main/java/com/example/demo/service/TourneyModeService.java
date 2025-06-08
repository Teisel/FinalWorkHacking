package com.example.demo.service;

import com.example.demo.entity.TourneyMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TourneyModeService {
    Iterable<TourneyMode> findAll();

    Page<TourneyMode> findAll(Pageable pageable);

    Optional<TourneyMode> findById(Integer id);

    TourneyMode save(TourneyMode tourneyMode);

    void deleteById(Integer id);

    List<TourneyMode> findTourneysModes(Integer idTourney);
}

