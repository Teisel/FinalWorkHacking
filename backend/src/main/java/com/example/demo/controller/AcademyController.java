package com.example.demo.controller;

import com.example.demo.entity.Academy;
import com.example.demo.entity.State;
import com.example.demo.service.AcademyService;
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
@RequestMapping({"/api/academies"})
public class AcademyController {
    @Autowired
    private AcademyService academyService;

    public AcademyController() {
    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody Academy academy) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.academyService.save(academy));
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<?> read(@PathVariable("id") Integer id) {
        Optional<Academy> academyOptional = this.academyService.findById(id);
        return !academyOptional.isPresent() ? ResponseEntity.notFound().build() : ResponseEntity.ok(academyOptional);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<?> update(@RequestBody Academy academy, @PathVariable("id") Integer id) {
        Optional<Academy> academyOptional = this.academyService.findById(id);
        if (!academyOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            ((Academy)academyOptional.get()).setName(academy.getName());
            ((Academy)academyOptional.get()).setDirection(academy.getDirection());
            ((Academy)academyOptional.get()).setIdState(academy.getIdState());
            return ResponseEntity.status(HttpStatus.CREATED).body(this.academyService.save((Academy)academyOptional.get()));
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!this.academyService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            this.academyService.deleteById(id);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping
    public List<Academy> readAll() {
        List<Academy> academies = (List)StreamSupport.stream(this.academyService.findAll().spliterator(), false).collect(Collectors.toList());
        return academies;
    }

    @GetMapping({"/stateAcademies/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<Academy> readeSomeAcademies(@PathVariable("id") Integer id) {
        List<Academy> academiesReturned = new ArrayList<>();
        List<Academy> academies = (List)StreamSupport.stream(this.academyService.findAll().spliterator(), false).collect(Collectors.toList());
        for (int i = 0; i < academies.size(); i++)
        {
            Academy academy = (Academy)academies.get(i);
            if (academy.getIdState() == id)
            {
                academiesReturned.add(academy);
            }
        }
        return academiesReturned;
    }
}

