package com.example.demo.controller;

import com.example.demo.entity.State;
import com.example.demo.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping({"/api/states"})
public class StateController {
    @Autowired
    private StateService stateService;

    public StateController() {
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody State state) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.stateService.save(state));
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<?> read(@PathVariable("id") Integer id) {
        Optional<State> stateOptional = this.stateService.findById(id);
        return !stateOptional.isPresent() ? ResponseEntity.notFound().build() : ResponseEntity.ok(stateOptional);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<?> update(@RequestBody State state, @PathVariable("id") Integer id) {
        Optional<State> stateOptional = this.stateService.findById(id);
        if (!stateOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            ((State)stateOptional.get()).setName(state.getName());
            ((State)stateOptional.get()).setIdCountry(state.getIdCountry());
            return ResponseEntity.status(HttpStatus.CREATED).body(this.stateService.save((State)stateOptional.get()));
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!this.stateService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            this.stateService.deleteById(id);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping
    public List<State> readAll() {
        List<State> states = (List)StreamSupport.stream(this.stateService.findAll().spliterator(), false).collect(Collectors.toList());
        return states;
    }
    @GetMapping({"/contryStates/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<State> readeSomeStates(@PathVariable("id") Integer id)
    {
        List<State> statesReturned = new ArrayList<>();
        List<State> states = (List)StreamSupport.stream(this.stateService.findAll().spliterator(), false).collect(Collectors.toList());
        for (int i = 0; i < states.size(); i++)
        {
            State state = (State)states.get(i);
            if (state.getIdCountry() == id)
            {
                statesReturned.add(state);
            }
        }
        return statesReturned;
    }
}
