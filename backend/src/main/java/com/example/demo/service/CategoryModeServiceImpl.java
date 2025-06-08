package com.example.demo.service;

import com.example.demo.entity.CategoryMode;
import com.example.demo.repository.CategoryModeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryModeServiceImpl implements CategoryModeService {
    @Autowired
    private CategoryModeRepository categoryModeRepository;

    public CategoryModeServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<CategoryMode> findAll() {
        return this.categoryModeRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<CategoryMode> findAll(Pageable pageable) {
        return this.categoryModeRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<CategoryMode> findById(Integer id) {
        return this.categoryModeRepository.findById(id);
    }

    @Transactional
    public CategoryMode save(CategoryMode categoryMode) {
        return (CategoryMode)this.categoryModeRepository.save(categoryMode);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.categoryModeRepository.deleteById(id);
    }

    @Override
    public List<CategoryMode> findCategories(Integer idMode) {
        return this.categoryModeRepository.findCategories(idMode);
    }

    @Override
    public List<CategoryMode> findCategoriesTourney(Integer idTourney) {
        return this.categoryModeRepository.findCategoriesTourney(idTourney);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CategoryMode> findPossibleChange(Date date1, Date date2, int band1, int band2, float weight1, float weight2, boolean sex, Integer id, Integer mode) {
        //CategoryMode categoryMode =
        return this.categoryModeRepository.findPossibleChange(date1, date2, band1, band2, weight1, weight2, sex, id, mode);
    }

    @Override
    public Optional<CategoryMode> findChangeAthlete(float weight, Integer band, boolean sex, Date birthDate, List<Integer> possibleChange) {
        return this.categoryModeRepository.changeAthlete(weight,band,sex,birthDate,possibleChange);
    }
}

