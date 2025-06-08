package com.example.demo.repository;

import com.example.demo.entity.CategoryMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryModeRepository extends JpaRepository<CategoryMode, Integer> {
    @Query(
            value =
                    "SELECT * FROM categoriasmodalidad " +
                            "WHERE idModalidad = ?1",
            nativeQuery = true

    )
    List<CategoryMode> findCategories(Integer idMode);

    @Query(
            value = "select c.* " +
                    " from categoriasmodalidad c" +
                    " join modalidadestorneo m" +
                    " on c.idmodalidad = m.idmodalidad" +
                    " join torneo t" +
                    " on m.idtorneo = t.idtorneo" +
                    " where t.idtorneo = ?1",
            nativeQuery = true
    )
    List<CategoryMode> findCategoriesTourney(Integer idTourney);

    @Query(
            value = "SELECT * FROM categoriasmodalidad " +
                    "WHERE idModalidad = :mode " +
                    "AND (( :date1 BETWEEN categoriasmodalidad.edadfinal AND categoriasmodalidad.edadinicial) " +
                    "OR (:date2 BETWEEN categoriasmodalidad.edadfinal AND categoriasmodalidad.edadinicial)) " +
                    "AND ((:band1 BETWEEN categoriasmodalidad.cintafinal AND categoriasmodalidad.cintainicial) " +
                    "OR (:band2 BETWEEN categoriasmodalidad.cintafinal AND categoriasmodalidad.cintainicial)) " +
                    "AND ((:weight1 BETWEEN categoriasmodalidad.pesoinicial AND categoriasmodalidad.pesofinal)  " +
                    "OR (:weight2 BETWEEN categoriasmodalidad.pesoinicial AND categoriasmodalidad.pesofinal)) " +
                    "AND (categoriasmodalidad.sexo = :sex) " +
                    "AND (categoriasmodalidad.idcategoria != :id) " +
                    "AND (categoriasmodalidad.state = false)" +
                    "LIMIT 1",
            nativeQuery = true
    )
    Optional<CategoryMode> findPossibleChange(
            @Param("date1") Date date1,
            @Param("date2") Date date2,
            @Param("band1") int band1,
            @Param("band2") int band2,
            @Param("weight1") float weight1,
            @Param("weight2") float weight2,
            @Param("sex") boolean sex,
            @Param("id") Integer id,
            @Param("mode") Integer mode
    );

    @Query(
            value = "select * from categoriasmodalidad " +
                    " where :weight between pesoinicial and pesofinal " +
                    " AND :band between cintafinal and cintainicial " +
                    " AND sexo = :sex " +
                    " AND :birthDate between edadfinal and edadinicial " +
                    " AND idcategoria IN(:possibleCategories) " +
                    " LIMIT 1",
            nativeQuery = true
    )
    Optional<CategoryMode> changeAthlete(
            @Param("weight") float weight,
            @Param("band") Integer band,
            @Param("sex")boolean sex,
            @Param("birthDate") Date birthDate,
            @Param("possibleCategories") List<Integer> possibleCategories
    );
}
