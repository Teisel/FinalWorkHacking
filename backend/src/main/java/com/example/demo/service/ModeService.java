package com.example.demo.service;

import com.example.demo.entity.Mode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ModeService {
    Iterable<Mode> findAll();

    Page<Mode> findAll(Pageable pageable);

    Optional<Mode> findById(Integer id);

    Mode save(Mode mode);

    void deleteById(Integer id);
}
