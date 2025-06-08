package com.example.demo.controller;

import com.example.demo.entity.CompleteResult;
import com.example.demo.entity.Result;
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
@RequestMapping({"/api/result"})
public class ResultDTO {
    @Autowired
    private ResultService resultService;

    @Autowired
    private ResultAthleteService resultAthleteService;

    public ResultDTO()
    {

    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody Result result)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.resultService.save(result));
    }

    @GetMapping("/categoryResults/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<Result> getResultsCategory(@PathVariable("id") Integer id)
    {
        return this.resultService.getResultCategory(id);
    }

    @GetMapping("/prevCategories/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<Integer> getPrevCategories(@PathVariable("id") Integer id)
    {
        return this.resultService.getPrevCategories(id);
    }

    @PutMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> update(@RequestBody Result result, @PathVariable ("id") Integer id)
    {
        Optional<Result> optionalResult = this.resultService.findById(id);
        if(!optionalResult.isPresent())
        {
            return ResponseEntity.notFound().build();
        }
        else
        {
            Result updatedRes = (Result) optionalResult.get();

            updatedRes.setNextRes(result.getNextRes());
            updatedRes.setResPrevA(result.getResPrevA());
            updatedRes.setResPrevB(result.getResPrevB());
            updatedRes.setWinner(result.getWinner());
            updatedRes.setLoser(result.getLoser());
            updatedRes.setIdCategory(result.getIdCategory());
            updatedRes.setRound(result.getRound());

            return ResponseEntity.status(HttpStatus.CREATED).body(this.resultService.save(updatedRes));
        }
    }

    @GetMapping({"/getCompleteResults/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<CompleteResult> getCompleteResults(@PathVariable("id") Integer id)
    {
        List<CompleteResult> completeResults = new ArrayList<>();
        List<Result> results = this.resultService.getResultCategory(id);
        if(!results.isEmpty())
        {
            for (int i = 0; i < results.size(); i++)
            {
                List<Integer> justOneXD = new ArrayList<>();
                justOneXD.add(results.get(i).getId());
                CompleteResult completeResult = new CompleteResult();
                completeResult.setResult(results.get(i));
                completeResult.setResultAthletes(this.resultAthleteService.getAllResults(justOneXD));
                completeResults.add(completeResult);
            }
        }
        return completeResults;
    }

}
