package com.example.demo.controller;

import com.example.demo.entity.AthleteTags;
import com.example.demo.service.AthleteTagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tags")
public class TagsDTO
{
    @Autowired
    private AthleteTagsService athleteTagsService;

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody AthleteTags athleteTags)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.athleteTagsService.save(athleteTags));
    }

    @GetMapping("/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> read(@PathVariable("id") Integer id)
    {
        Optional<AthleteTags> optionalAthleteTags = this.athleteTagsService.findById(id);
        return  !optionalAthleteTags.isPresent() ? ResponseEntity.notFound().build() : ResponseEntity.ok(optionalAthleteTags);
    }
}
