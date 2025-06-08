package com.example.demo.service;

import com.example.demo.entity.State;
import com.example.demo.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class StateServiceImpl implements StateService {
    @Autowired
    private StateRepository stateRepository;

    public StateServiceImpl() {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<State> findAll() {
        return this.stateRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<State> findAll(Pageable pageable) {
        return this.stateRepository.findAll(pageable);
    }

    @Transactional(
            readOnly = true
    )
    public Optional<State> findById(Integer id) {
        return this.stateRepository.findById(id);
    }

    @Transactional
    public State save(State state) {
        return (State)this.stateRepository.save(state);
    }

    @Transactional
    public void deleteById(Integer id) {
        this.stateRepository.deleteById(id);
    }
}

