package com.example.demo.service;

import com.example.demo.entity.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ResultService {
    Iterable<Result> findAll();

    Page<Result> findAll(Pageable pageable);

    Optional<Result> findById(Integer id);

    Result save(Result result);

    void deleteById(Integer id);

    List<Result> getResultCategory(Integer id);

    List<Integer> getPrevCategories (Integer id);

    List<Integer> getAllResults (Integer id);

}

