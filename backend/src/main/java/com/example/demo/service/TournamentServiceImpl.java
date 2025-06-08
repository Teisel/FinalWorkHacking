package com.example.demo.service;

import com.example.demo.entity.CategoryMode;
import com.example.demo.entity.Tournament;
import com.example.demo.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TournamentServiceImpl implements TournamentService {
    @Autowired
    private TournamentRepository tournamentRepository;

    public TournamentServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Tournament> findAll() {
        return this.tournamentRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Tournament> findAll(Pageable pageable) {
        return this.tournamentRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<Tournament> findById(Integer id) {
        return this.tournamentRepository.findById(id);
    }

    @Transactional
    public Tournament save(Tournament tournament) {
        return (Tournament)this.tournamentRepository.save(tournament);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.tournamentRepository.deleteById(id);
    }

    @Transactional(
            readOnly = true
    )
    public List<Tournament> findHistoryUserTourney(Integer idUser) {
        return this.tournamentRepository.findHistoryUserTourney(idUser);
    }

    @Transactional(
            readOnly = true
    )
    public List<Tournament> findInscriptionTourney(Integer idUser) {
        return this.tournamentRepository.findInscriptionTourney(idUser);
    }

    @Transactional(
            readOnly = true
    )
    public List<Tournament> findActiveTourneys(List<Integer> idTourneys) {
        return this.tournamentRepository.findActiveTourneys(idTourneys);
    }

    @Transactional(
            readOnly = true
    )
    public List<Integer> finAllTourneysUser(Integer idUser) {
        return this.tournamentRepository.finAllTourneysUser(idUser);
    }

    @Transactional
    public List<Tournament> findHistoryOrganizer(Integer idUser) {
        return this.tournamentRepository.findHistoryOrganizer(idUser);
    }

    @Override
    @Transactional(readOnly = true)
    public Tournament findActiveTournamentOrganizer(Integer idOrganizer) {
        return this.tournamentRepository.findActiveTournamentOrganizer(idOrganizer);
    }


}
