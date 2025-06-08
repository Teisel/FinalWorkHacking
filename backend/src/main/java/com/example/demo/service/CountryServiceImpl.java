package com.example.demo.service;

import com.example.demo.entity.Country;
import com.example.demo.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CountryServiceImpl implements CountryService {
    @Autowired
    private CountryRepository countryRepository;

    public CountryServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Country> findAll() {
        return this.countryRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Country> findAll(Pageable pageable) {
        return this.countryRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<Country> findById(Integer id) {
        return this.countryRepository.findById(id);
    }

    @Transactional
    public Country save(Country country) {
        return (Country)this.countryRepository.save(country);
    }

    public void deleteById(Integer id) {
        this.countryRepository.deleteById(id);
    }
}

