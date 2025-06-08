package com.example.demo.service;

import com.example.demo.entity.Result;
import com.example.demo.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ResultServiceImpl implements ResultService {
    @Autowired
    private ResultRepository resultRepository;

    public ResultServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Result> findAll() {
        return this.resultRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Result> findAll(Pageable pageable) {
        return this.resultRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<Result> findById(Integer id) {
        return this.resultRepository.findById(id);
    }

    @Transactional
    public Result save(Result result) {
        return (Result)this.resultRepository.save(result);
    }

    public void deleteById(Integer id) {
        this.resultRepository.deleteById(id);
    }

    @Override
    public List<Result> getResultCategory(Integer id) {
        return this.resultRepository.getCategoryResults(id);
    }

    @Override
    public List<Integer> getPrevCategories(Integer id) {
        return this.resultRepository.getPrevCategories(id);
    }

    @Override
    public List<Integer> getAllResults(Integer id) {
        return this.resultRepository.getAllResults(id);
    }
}

