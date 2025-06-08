package com.example.demo.service;

import com.example.demo.entity.ResultAthlete;
import com.example.demo.repository.ResultAthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ResultAthleteServiceImpl implements ResultAthleteService {
    @Autowired
    private ResultAthleteRepository resultAthleteRepository;

    public ResultAthleteServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<ResultAthlete> findAll() {
        return this.resultAthleteRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<ResultAthlete> findAll(Pageable pageable) {
        return this.resultAthleteRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<ResultAthlete> findById(Integer id) {
        return this.resultAthleteRepository.findById(id);
    }

    @Transactional
    public ResultAthlete save(ResultAthlete resultAthlete) {
        return (ResultAthlete)this.resultAthleteRepository.save(resultAthlete);
    }

    public void deleteById(Integer id) {
        this.resultAthleteRepository.deleteById(id);
    }

    @Override
    public List<ResultAthlete> getAllResults(List<Integer> ids) {
        return this.resultAthleteRepository.getAllResults(ids);
    }
}

