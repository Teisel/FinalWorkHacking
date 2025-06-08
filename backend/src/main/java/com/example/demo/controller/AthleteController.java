package com.example.demo.controller;

import com.example.demo.entity.Athlete;
import com.example.demo.entity.CategoryMode;
import com.example.demo.entity.Competitor;
import com.example.demo.entity.User;
import com.example.demo.service.AthleteService;
import com.example.demo.service.CategoryModeService;
import com.example.demo.service.CompetitorService;
import com.example.demo.service.UserService;
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
@RequestMapping({"/api/athletes"})
public class AthleteController {
    @Autowired
    private AthleteService athleteService;

    @Autowired
    private CategoryModeService categoryModeService;

    @Autowired
    private CompetitorService competitorService;

    @Autowired
    private UserService userService;

    public AthleteController() {
    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> crate(@RequestBody Athlete athlete) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.athleteService.save(athlete));
    }

    @GetMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> read(@PathVariable("id") Integer id) {
        Optional<Athlete> athleteOptional = this.athleteService.findById(id);
        return !athleteOptional.isPresent() ? ResponseEntity.notFound().build() : ResponseEntity.ok(athleteOptional);
    }

    @GetMapping({"/verifyAthlete/{id}/{idCategory}/{idCompetitor}/{idTourney}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> needChange(@PathVariable("id") Integer id, @PathVariable("idCategory") Integer idCategory, @PathVariable("idCompetitor") Integer idCompetitor, @PathVariable("idTourney")Integer idTourney)
    {
        //TEEEEERMIIINAAA ESTOOOOOO!!!
        Optional<Athlete> athleteOptional = this.athleteService.findById(id);
        Optional<Competitor> competitorOptional = this.competitorService.findById(idCompetitor);
        Optional<CategoryMode> categoryModeOptional = this.categoryModeService.findById(idCategory);
        Optional<User> optionalUser = this.userService.findById(id);
        List<Integer> categoriesIds = new ArrayList<>();

        //Si no encuentra alguno de estas tres, no retorna

        if (
                (!athleteOptional.isPresent()) ||
                        (!competitorOptional.isPresent()) ||
                        (!categoryModeOptional.isPresent()) ||
                        (!optionalUser.isPresent())
        )
        {
            return ResponseEntity.notFound().build();
        }

        //Se verifica que no se deba cambiar
        if (athleteOptional.get().getWeight() < categoryModeOptional.get().getWeightStart() ||
                athleteOptional.get().getWeight() > categoryModeOptional.get().getWeightEnd())
        {
            List<CategoryMode> categoryModes = this.categoryModeService.findCategoriesTourney(idTourney);
            if (categoryModes.size() == 0)
            {
                //Avisar que se descalifico porque no se encontro otra categoria!!!!!
                return ResponseEntity.notFound().build();
            }
            for (int i = 0; i < categoryModes.size(); i++)
            {
                categoriesIds.add(categoryModes.get(i).getId());
            }

            Optional<CategoryMode> possibleCategory = this.categoryModeService.findChangeAthlete(athleteOptional.get().getWeight(),
                    athleteOptional.get().getIdColor(),
                    optionalUser.get().isGender(),
                    optionalUser.get().getBornDate(),
                    categoriesIds);
            if (possibleCategory.isEmpty())
            {
                //Advertir que no se encontro una categoria en donde ponerlo
                return ResponseEntity.notFound().build();
            }
            else
            {
                //Hacer el cambio de categoria al deportista
                //En teroria no deberia de haber resultados
                //En teoria tampoco deberia tener resultados de deportista
                //Así que solo seria cambiar en donde participa
                Competitor newCompetitor = new Competitor();
                newCompetitor.setIdUser(competitorOptional.get().getIdUser());
                newCompetitor.setIdCategory(possibleCategory.get().getId());
                newCompetitor.setVerify(true);
                newCompetitor.setPlace(0);

                this.competitorService.deleteById(competitorOptional.get().getId());

                return ResponseEntity.status(HttpStatus.CREATED).body(this.competitorService.save(newCompetitor));
            }
        }
        return ResponseEntity.ok().build();

    }

    @PutMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> update(@RequestBody Athlete athlete, @PathVariable("id") Integer id) {
        Optional<Athlete> athleteOptional = this.athleteService.findById(id);
        if (!athleteOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            ((Athlete)athleteOptional.get()).setWeight(athlete.getWeight());
            ((Athlete)athleteOptional.get()).setHigh(athlete.getHigh());
            ((Athlete)athleteOptional.get()).setIdColor(athlete.getIdColor());
            return ResponseEntity.status(HttpStatus.CREATED).body(this.athleteService.save((Athlete)athleteOptional.get()));
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!this.athleteService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            this.athleteService.deleteById(id);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping
    public List<Athlete> readAll() {
        List<Athlete> athletes = (List)StreamSupport.stream(this.athleteService.findAll().spliterator(), false).collect(Collectors.toList());
        return athletes;
    }
}

