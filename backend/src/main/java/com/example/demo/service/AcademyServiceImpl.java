package com.example.demo.service;

import com.example.demo.entity.Academy;
import com.example.demo.repository.AcademyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AcademyServiceImpl implements AcademyService {
    @Autowired
    private AcademyRepository academyRepository;

    public AcademyServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Academy> findAll() {
        return this.academyRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Academy> findAll(Pageable pageable) {
        return this.academyRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<Academy> findById(Integer id) {
        return this.academyRepository.findById(id);
    }

    @Transactional
    public Academy save(Academy academy) {
        return (Academy)this.academyRepository.save(academy);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.academyRepository.deleteById(id);
    }
}

