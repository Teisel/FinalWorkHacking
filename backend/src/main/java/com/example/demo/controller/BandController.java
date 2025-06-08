package com.example.demo.controller;

import com.example.demo.entity.Band;
import com.example.demo.service.BandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping({"/api/bands"})
public class BandController {
    @Autowired
    private BandService bandService;

    public BandController() {
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Band band) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.bandService.save(band));
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<?> read(@PathVariable("id") Integer id) {
        Optional<Band> optionalBand = this.bandService.findById(id);
        return !optionalBand.isPresent() ? ResponseEntity.notFound().build() : ResponseEntity.ok(optionalBand);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<?> update(@RequestBody Band band, @PathVariable("id") Integer id) {
        Optional<Band> optionalBand = this.bandService.findById(id);
        if (!optionalBand.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            ((Band)optionalBand.get()).setColor(band.getColor());
            return ResponseEntity.status(HttpStatus.CREATED).body(this.bandService.save((Band)optionalBand.get()));
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!this.bandService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            this.bandService.deleteById(id);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<Band> readAll() {
        List<Band> bands = (List)StreamSupport.stream(this.bandService.findAll().spliterator(), false).collect(Collectors.toList());
        return bands;
    }
}
