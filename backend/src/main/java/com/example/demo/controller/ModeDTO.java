package com.example.demo.controller;

import com.example.demo.entity.TourneyMode;
import com.example.demo.service.TourneyModeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/modeDTO"})
public class ModeDTO
{
    @Autowired
    private TourneyModeService tourneyModeService;

    public ModeDTO()
    {

    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody TourneyMode tourneyMode)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.tourneyModeService.save(tourneyMode));
    }
}
