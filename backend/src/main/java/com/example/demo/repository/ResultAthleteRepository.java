package com.example.demo.repository;

import com.example.demo.entity.ResultAthlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultAthleteRepository extends JpaRepository<ResultAthlete, Integer> {

    @Query(
            value = "SELECT * FROM resultadodep WHERE idresultado in(:ids)",
            nativeQuery = true
    )
    List<ResultAthlete> getAllResults(@Param("ids") List<Integer> ids);

}
