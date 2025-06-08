package com.example.demo.repository;

import com.example.demo.entity.CategoryMode;
import com.example.demo.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Integer> {
    @Query(
            value = "SELECT torneo.* FROM participante     INNER JOIN categoriasmodalidad ON participante.idcategoria = categoriasmodalidad.idcategoria     INNER JOIN modalidadestorneo ON categoriasmodalidad.idmodalidad = modalidadestorneo.idmodalidad     INNER JOIN torneo ON modalidadestorneo.idtorneo = torneo.idtorneo     WHERE torneo.status = FALSE AND participante.idusuario = ?1     GROUP BY torneo.nombre",
            nativeQuery = true
    )
    List<Tournament> findHistoryUserTourney(Integer idUser);

    @Query(
            value = "SELECT torneo.* FROM participante     INNER JOIN categoriasmodalidad ON participante.idcategoria = categoriasmodalidad.idcategoria     INNER JOIN modalidadestorneo ON categoriasmodalidad.idmodalidad = modalidadestorneo.idmodalidad     INNER JOIN torneo ON modalidadestorneo.idtorneo = torneo.idtorneo     WHERE torneo.status = TRUE AND participante.idusuario = ?1     GROUP BY torneo.nombre",
            nativeQuery = true
    )
    List<Tournament> findInscriptionTourney(Integer idUser);

    @Query(
            value = "Select * FROM torneo WHERE idtorneo NOT IN (:idTourneys) and status = TRUE",
            nativeQuery = true
    )
    List<Tournament> findActiveTourneys(@Param("idTourneys") List<Integer> idTourneys);

    @Query(
            value = "SELECT torneo.idtorneo FROM participante INNER JOIN categoriasmodalidad ON participante.idcategoria = categoriasmodalidad.idcategoria INNER JOIN modalidadestorneo ON categoriasmodalidad.idmodalidad = modalidadestorneo.idmodalidad INNER JOIN torneo ON modalidadestorneo.idtorneo = torneo.idtorneo WHERE participante.idusuario = ?1 GROUP BY torneo.nombre",
            nativeQuery = true
    )
    List<Integer> finAllTourneysUser(Integer idUser);

    @Query(
            value = "SELECT * FROM torneo " +
                    "WHERE idusuario = ?1 " +
                    "AND status = 0",
            nativeQuery = true
    )
    List<Tournament> findHistoryOrganizer(Integer idUser);

    @Query(
            value = "SELECT * FROM torneo " +
                    "WHERE idUsuario = ?1  " +
                    "AND status = true",
            nativeQuery = true
    )
    Tournament findActiveTournamentOrganizer(Integer idOrganizer);


}