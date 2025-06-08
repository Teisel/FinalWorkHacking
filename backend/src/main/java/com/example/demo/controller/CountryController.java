package com.example.demo.controller;

import com.example.demo.entity.Country;
import com.example.demo.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping({"/api/countries"})
public class CountryController {
    @Autowired
    private CountryService coSE;

    public CountryController() {
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Country country) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.coSE.save(country));
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<?> read(@PathVariable("id") Integer id) {
        Optional<Country> country = this.coSE.findById(id);
        return !country.isPresent() ? ResponseEntity.notFound().build() : ResponseEntity.ok(country);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<?> update(@RequestBody Country country, @PathVariable("id") Integer id) {
        Optional<Country> countryOptional = this.coSE.findById(id);
        if (!countryOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            ((Country)countryOptional.get()).setName(country.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(this.coSE.save((Country)countryOptional.get()));
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!this.coSE.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            this.coSE.deleteById(id);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<Country> readAll() {
        List<Country> countries = (List)StreamSupport.stream(this.coSE.findAll().spliterator(), false).collect(Collectors.toList());
        return countries;
    }
}

