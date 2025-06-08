package com.example.demo.controller;

import com.example.demo.entity.Athlete;
import com.example.demo.entity.AthleteComplete;
import com.example.demo.entity.Band;
import com.example.demo.service.AthleteService;
import com.example.demo.service.BandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping({"/api/athleteInfo"})
public class AthleteCompleteDTO {
    @Autowired
    private AthleteService athleteService;
    @Autowired
    private BandService bandService;

    public AthleteCompleteDTO() {
    }

    @GetMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> read(@PathVariable("id") Integer id) {
        Optional<Athlete> athleteOptional = this.athleteService.findById(id);
        if (!athleteOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            Optional<Band> optionalBand = this.bandService.findById(((Athlete)athleteOptional.get()).getIdColor());
            AthleteComplete athleteComplete = new AthleteComplete();
            athleteComplete.setHigh(((Athlete)athleteOptional.get()).getHigh());
            athleteComplete.setWeight(((Athlete)athleteOptional.get()).getWeight());
            athleteComplete.setColor(((Band)optionalBand.get()).getColor());
            athleteComplete.setIdColor(((Athlete)athleteOptional.get()).getIdColor());
            //System.out.println("Tilin");
            return ResponseEntity.ok(athleteComplete);
        }
    }
}

