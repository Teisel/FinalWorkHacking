package com.example.demo.repository;

import com.example.demo.entity.Competitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitorRepository extends JpaRepository<Competitor, Integer> {
    @Query(
            value = "SELECT * FROM participante " +
                    "WHERE idcategoria = ?1",
            nativeQuery = true
    )
    List<Competitor> getCompetitors(Integer idCategory);

    @Query(
            value = "select p.* " +
                    "from participante p  " +
                    "join categoriasmodalidad c " +
                    "on p.idcategoria = c.idcategoria " +
                    "join modalidadestorneo m " +
                    "on c.idmodalidad = m.idmodalidad " +
                    "join torneo t " +
                    "on m.idtorneo = t.idtorneo " +
                    "where t.idtorneo = ?1",
            nativeQuery = true
    )
    List<Competitor> findTourneyCompetitors(Integer idTourney);
}