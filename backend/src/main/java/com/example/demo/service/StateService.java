package com.example.demo.service;

import com.example.demo.entity.State;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface StateService {
    Iterable<State> findAll();

    Page<State> findAll(Pageable pageable);

    Optional<State> findById(Integer id);

    State save(State state);

    void deleteById(Integer id);
}
