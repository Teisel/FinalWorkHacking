package com.example.demo.service;

import com.example.demo.entity.TourneyMode;
import com.example.demo.repository.TourneyModeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TourneyModeServiceImpl implements TourneyModeService {
    @Autowired
    private TourneyModeRepository tourneyModeRepository;

    public TourneyModeServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<TourneyMode> findAll() {
        return this.tourneyModeRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<TourneyMode> findAll(Pageable pageable) {
        return this.tourneyModeRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<TourneyMode> findById(Integer id) {
        return this.tourneyModeRepository.findById(id);
    }

    @Transactional
    public TourneyMode save(TourneyMode tourneyMode) {
        return (TourneyMode)this.tourneyModeRepository.save(tourneyMode);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.tourneyModeRepository.deleteById(id);
    }

    @Override
    public List<TourneyMode> findTourneysModes(Integer idTourney) {
        return this.tourneyModeRepository.findTourneysModes(idTourney);
    }
}

