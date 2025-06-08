package com.example.demo.service;

import com.example.demo.entity.Band;
import com.example.demo.repository.BandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class BandServiceImpl implements BandService {
    @Autowired
    private BandRepository bandRepository;

    public BandServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Band> findAll() {
        return this.bandRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Band> findAll(Pageable pageable) {
        return this.bandRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<Band> findById(Integer id) {
        return this.bandRepository.findById(id);
    }

    @Transactional
    public Band save(Band band) {
        return (Band)this.bandRepository.save(band);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.bandRepository.deleteById(id);
    }
}
