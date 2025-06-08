package com.example.demo.service;

import com.example.demo.entity.Band;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BandService {
    Iterable<Band> findAll();

    Page<Band> findAll(Pageable pageable);

    Optional<Band> findById(Integer id);

    Band save(Band band);

    void deleteById(Integer id);
}
