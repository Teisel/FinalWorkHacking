package com.example.demo.repository;

import com.example.demo.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {
    @Query(
            value = "select * from resultado where idcategoria = ?1",
            nativeQuery = true
    )
    List<Result> getCategoryResults (Integer id);

    @Query(
            value = "SELECT idResultado FROM resultado WHERE idNextRes = ?1",
            nativeQuery = true
    )
    List<Integer> getPrevCategories (Integer id);

    @Query(
            value = "SELECT idResultado FROM resultado WHERE idcategoria = ?1",
            nativeQuery = true
    )
    List<Integer> getAllResults (Integer id);
}
