package com.example.demo.repository;

import com.example.demo.entity.TourneyMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourneyModeRepository extends JpaRepository<TourneyMode, Integer> {
    @Query(
            value = "SELECT * FROM modalidadestorneo " +
                    "WHERE idTorneo = ?1",
            nativeQuery = true
    )
    List<TourneyMode> findTourneysModes(Integer idTourney);

}