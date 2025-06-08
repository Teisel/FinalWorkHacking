package com.example.demo.service;

import com.example.demo.entity.Academy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AcademyService {
    Iterable<Academy> findAll();

    Page<Academy> findAll(Pageable pageable);

    Optional<Academy> findById(Integer id);

    Academy save(Academy academy);

    void deleteById(Integer id);
}
