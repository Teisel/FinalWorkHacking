package com.example.demo.controller;

import com.example.demo.entity.ResultAthlete;
import com.example.demo.service.ResultAthleteService;
import com.example.demo.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/api/resultAthlete"})
public class ResultAthleteDTO {
    @Autowired
    private ResultAthleteService resultAthleteService;
    @Autowired
    private ResultService resultService;

    public ResultAthleteDTO()
    {

    }

    @PutMapping("/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> update(@RequestBody ResultAthlete resultAthlete, @PathVariable("id") Integer id)
    {
        Optional<ResultAthlete> optionalResultAthlete = this.resultAthleteService.findById(id);
        if(!optionalResultAthlete.isPresent())
        {
            return ResponseEntity.notFound().build();
        }
        ResultAthlete updatedRes = (ResultAthlete) optionalResultAthlete.get();

        updatedRes.setFouls(resultAthlete.getFouls());
        updatedRes.setPoints(resultAthlete.getPoints());

        return ResponseEntity.status(HttpStatus.CREATED).body(this.resultAthleteService.save(updatedRes));
    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody ResultAthlete resultAthlete)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.resultAthleteService.save(resultAthlete));
    }

    @GetMapping("/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<ResultAthlete> getAthleteResults(@PathVariable("id") Integer id)
    {
        return this.resultAthleteService.getAllResults(this.resultService.getAllResults(id));
    }
}
