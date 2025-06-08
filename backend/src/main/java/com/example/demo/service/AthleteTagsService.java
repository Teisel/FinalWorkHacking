package com.example.demo.service;

import com.example.demo.entity.AthleteTags;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AthleteTagsService {
    Iterable<AthleteTags> findAll();

    Page<AthleteTags> findAll(Pageable pageable);

    Optional<AthleteTags> findById(Integer id);

    AthleteTags save(AthleteTags athleteTags);

    void deleteById(Integer id);
}
