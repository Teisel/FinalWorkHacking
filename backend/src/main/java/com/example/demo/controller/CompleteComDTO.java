package com.example.demo.controller;

import com.example.demo.entity.Competitor;
import com.example.demo.entity.CompleteCompetitor;
import com.example.demo.entity.User;
import com.example.demo.service.CompetitorService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/api/completeCom"})
public class CompleteComDTO {
    @Autowired
    private CompetitorService competitorService;

    @Autowired
    private UserService userService;

    public CompleteComDTO(){}

    @GetMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<CompleteCompetitor> getCompetitors(@PathVariable("id") Integer id)
    {
        List<Competitor> competitors = this.competitorService.getCompetitors(id);
        List<CompleteCompetitor> completeCompetitors = new ArrayList<>();
        if(!competitors.isEmpty())
        {
            for (int i = 0; i < competitors.size(); i++)
            {
                Competitor competitor = competitors.get(i);
                CompleteCompetitor completeCompetitor = new CompleteCompetitor();
                Optional<User> user = this.userService.findById(competitor.getIdUser());
                if (user.isPresent())
                {
                    completeCompetitor.setName(user.get().getName());
                    completeCompetitor.setIdAcademy(user.get().getIdAcademy());
                }
                completeCompetitor.setId(competitor.getId());
                completeCompetitor.setIdCategory(competitor.getIdCategory());
                completeCompetitor.setIdUser(competitor.getIdUser());
                completeCompetitor.setPlace(competitor.getPlace());
                completeCompetitors.add(completeCompetitor);
            }
        }
        return completeCompetitors;
    }
}
