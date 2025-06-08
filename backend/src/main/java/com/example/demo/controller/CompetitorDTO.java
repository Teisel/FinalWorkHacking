package com.example.demo.controller;

import com.example.demo.entity.Competitor;
import com.example.demo.service.CategoryModeService;
import com.example.demo.service.CompetitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/api/competitor"})
public class CompetitorDTO {
    @Autowired
    private CompetitorService competitorService;
    @Autowired
    private CategoryModeService categoryModeService;

    public CompetitorDTO(){
    }

    @GetMapping({"/{id}/{idUser}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public boolean readSome(@PathVariable("id") Integer id, @PathVariable("idUser") Integer idUser){
        List<Competitor> competitors = this.competitorService.getCompetitors(id);
        for (int i = 0; i < competitors.size(); i++)
        {
            Competitor competitor = competitors.get(i);
            if (competitor.getIdUser() == idUser)
            {
                return false;
            }
        }
        return true;
    }

    @GetMapping({"/tourneyCompetitors/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<Competitor> tourneyCom(@PathVariable("id") Integer id)
    {
        return this.competitorService.findTourneyCompetitors(id);
    }


    @PutMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> update(@RequestBody Competitor competitor, @PathVariable ("id") Integer id)
    {
        Optional<Competitor> optionalCompetitor = this.competitorService.findById(id);
        if(!optionalCompetitor.isPresent())
        {
            return  ResponseEntity.notFound().build();
        }
        else
        {
            Competitor updatedCom = (Competitor) optionalCompetitor.get();

            updatedCom.setPlace(competitor.getPlace());
            updatedCom.setVerify(competitor.isVerify());

            return  ResponseEntity.status(HttpStatus.CREATED).body(this.competitorService.save(updatedCom));
        }
    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody Competitor competitor){
        return ResponseEntity.status(HttpStatus.CREATED).body(this.competitorService.save(competitor));
    }
}
