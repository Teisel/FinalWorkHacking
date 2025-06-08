package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(
            value = "SELECT * FROM usuario " +
                    "WHERE LOCATE(:word, nombre) " +
                    "AND tipo = 'deportista'",
            nativeQuery = true
    )
    List<User> searchUsers(@Param("word") String word);

    @Query(
            value = "SELECT * FROM usuario WHERE idUsuario IN( :ids )",
            nativeQuery = true
    )
    List<User> searchCompetitors(@Param("ids") List<Integer> ids);
}
