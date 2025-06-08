package com.example.demo.service;

import com.example.demo.entity.CategoryMode;
import com.example.demo.entity.Tournament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TournamentService {
    Iterable<Tournament> findAll();

    Page<Tournament> findAll(Pageable pageable);

    Optional<Tournament> findById(Integer id);

    Tournament save(Tournament tournament);

    void deleteById(Integer id);

    List<Tournament> findHistoryUserTourney(Integer idUser);

    List<Tournament> findInscriptionTourney(Integer idUser);

    List<Tournament> findActiveTourneys(List<Integer> idTourneys);

    List<Integer> finAllTourneysUser(Integer idUser);

    List<Tournament> findHistoryOrganizer(Integer idUser);

    Tournament findActiveTournamentOrganizer(Integer idOrganizer);


}
