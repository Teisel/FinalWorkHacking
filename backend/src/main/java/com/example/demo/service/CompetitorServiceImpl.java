package com.example.demo.service;

import com.example.demo.entity.Competitor;
import com.example.demo.repository.CompetitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CompetitorServiceImpl implements CompetitorService {
    @Autowired
    private CompetitorRepository competitorRepository;

    public CompetitorServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Competitor> findAll() {
        return this.competitorRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Competitor> findAll(Pageable pageable) {
        return this.competitorRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<Competitor> findById(Integer id) {
        return this.competitorRepository.findById(id);
    }

    @Transactional
    public Competitor save(Competitor competitor) {
        return (Competitor)this.competitorRepository.save(competitor);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.competitorRepository.deleteById(id);
    }

    @Override
    public List<Competitor> getCompetitors(Integer idCategory) {
        return this.competitorRepository.getCompetitors(idCategory);
    }

    @Override
    public List<Competitor> findTourneyCompetitors(Integer idTourney) {
        return this.competitorRepository.findTourneyCompetitors(idTourney);
    }
}
