package com.example.demo.service;

import com.example.demo.entity.Country;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CountryService {
    Iterable<Country> findAll();

    Page<Country> findAll(Pageable pageable);

    Optional<Country> findById(Integer id);

    Country save(Country country);

    void deleteById(Integer id);
}