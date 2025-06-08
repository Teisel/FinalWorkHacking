package com.example.demo.service;

import com.example.demo.entity.Mode;
import com.example.demo.repository.ModeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ModeServiceImpl implements ModeService {
    @Autowired
    private ModeRepository modeRepository;

    public ModeServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Mode> findAll() {
        return this.modeRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Mode> findAll(Pageable pageable) {
        return this.modeRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<Mode> findById(Integer id) {
        return this.modeRepository.findById(id);
    }

    public Mode save(Mode mode) {
        return (Mode)this.modeRepository.save(mode);
    }

    public void deleteById(Integer id) {
        this.modeRepository.deleteById(id);
    }
}

