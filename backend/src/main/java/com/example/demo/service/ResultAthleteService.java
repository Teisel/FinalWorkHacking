package com.example.demo.service;

import com.example.demo.entity.ResultAthlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ResultAthleteService {
    Iterable<ResultAthlete> findAll();

    Page<ResultAthlete> findAll(Pageable pageable);

    Optional<ResultAthlete> findById(Integer id);

    ResultAthlete save(ResultAthlete resultAthlete);

    void deleteById(Integer id);

    List<ResultAthlete> getAllResults(List<Integer> ids);
}

