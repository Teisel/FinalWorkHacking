package com.example.demo.service;

import com.example.demo.entity.CategoryMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface CategoryModeService {
    Iterable<CategoryMode> findAll();

    Page<CategoryMode> findAll(Pageable pageable);

    Optional<CategoryMode> findById(Integer id);

    CategoryMode save(CategoryMode categoryMode);

    void deleteById(Integer id);

    List<CategoryMode> findCategories(Integer idMode);

    List<CategoryMode> findCategoriesTourney(Integer idTourney);

    Optional<CategoryMode> findPossibleChange(Date date1, Date date2, int band1, int band2, float weight1, float weight2, boolean sex, Integer id,Integer mode);

    Optional<CategoryMode> findChangeAthlete(float weight, Integer band, boolean sex, Date birthDate, List<Integer>possibleChange);
}
