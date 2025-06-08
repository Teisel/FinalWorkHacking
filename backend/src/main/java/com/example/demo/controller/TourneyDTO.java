package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.*;
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
@RequestMapping({"/api/tourneyInfo"})
public class TourneyDTO {
    @Autowired
    private TournamentService tournamentService;
    @Autowired
    private UserService userService;
    @Autowired
    private AcademyService academyService;
    @Autowired
    private StateService stateService;
    @Autowired
    private CountryService countryService;
    @Autowired
    private TourneyModeService tourneyModeService;
    @Autowired
    private ModeService modeService;
    @Autowired
    private CategoryModeService categoryModeService;
    @Autowired
    private BandService bandService;

    public TourneyDTO()
    {

    }

    @GetMapping({"/history"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<SimpleTourney> getHistoryTourneys()
    {
        new Tournament();
        List<Tournament> tournaments = (List) StreamSupport.stream(this.tournamentService.findAll().spliterator(), false).collect(Collectors.toList());
        List<SimpleTourney> simpleTourneys = new ArrayList<SimpleTourney>();
        for (int i = 0; i < tournaments.size(); i++)
        {
            Tournament tournament = (Tournament)tournaments.get(i);
            if(tournament.isStatus() == false)
            {
                SimpleTourney simple = new SimpleTourney();
                simple.setId(tournament.getId());
                simple.setName(tournament.getName());
                simpleTourneys.add(simple);
            }
        }
        return simpleTourneys;
    }
    @GetMapping({"/active"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<SimpleTourney> getActiveTourneys()
    {
        new Tournament();
        List<Tournament> tournaments = (List) StreamSupport.stream(this.tournamentService.findAll().spliterator(), false).collect(Collectors.toList());
        List<SimpleTourney> simpleTourneys = new ArrayList<SimpleTourney>();
        for (int i = 0; i < tournaments.size(); i++)
        {
            Tournament tournament = (Tournament)tournaments.get(i);
            if(tournament.isStatus() == true)
            {
                SimpleTourney simple = new SimpleTourney();
                simple.setId(tournament.getId());
                simple.setName(tournament.getName());
                simpleTourneys.add(simple);
            }
        }
        return simpleTourneys;
    }

    @GetMapping({"/userHistory/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<SimpleTourney> getUserHistory(@PathVariable("id")Integer id)
    {
        new Tournament();
        List<Tournament> tournaments = (List) StreamSupport.stream(this.tournamentService.findHistoryUserTourney(id).spliterator(), false).collect(Collectors.toList());
        List<SimpleTourney> simpleTourneys = new ArrayList<>();
        for (int i = 0; i < tournaments.size(); i++)
        {
            Tournament tournament = (Tournament)tournaments.get(i);
            SimpleTourney simpleTourney = new SimpleTourney();
            simpleTourney.setId(tournament.getId());
            simpleTourney.setName(tournament.getName());
            simpleTourneys.add(simpleTourney);
        }
        return simpleTourneys;
    }
    @GetMapping("/userActive/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public  List<SimpleTourney> getActiveTournamentAthlete(@PathVariable("id")Integer id)
    {
        new Tournament();
        List<Integer> integers = (List) StreamSupport.stream(this.tournamentService.finAllTourneysUser(id).spliterator(), false).collect(Collectors.toList());
        integers.add(0);
        List<Tournament> tournaments = (List) StreamSupport.stream(this.tournamentService.findActiveTourneys(integers).spliterator(), false).collect(Collectors.toList());
        List<SimpleTourney> simpleTourneys = new ArrayList<>();
        for (int i = 0; i < tournaments.size(); i++)
        {
            Tournament tournament = (Tournament)tournaments.get(i);
            SimpleTourney simpleTourney = new SimpleTourney();
            simpleTourney.setId(tournament.getId());
            simpleTourney.setName(tournament.getName());
            simpleTourneys.add(simpleTourney);
        }
        return simpleTourneys;
    }
    @GetMapping("/userInscriptions/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<SimpleTourney> getInscriptionsAthlete(@PathVariable("id")Integer id)
    {
        new Tournament();
        List<Tournament> tournaments = (List) StreamSupport.stream(this.tournamentService.findInscriptionTourney(id).spliterator(), false).collect(Collectors.toList());
        List<SimpleTourney> simpleTourneys = new ArrayList<>();
        for (int i = 0; i < tournaments.size(); i++)
        {
            Tournament tournament = (Tournament)tournaments.get(i);
            SimpleTourney simpleTourney = new SimpleTourney();
            simpleTourney.setId(tournament.getId());
            simpleTourney.setName(tournament.getName());
            simpleTourneys.add(simpleTourney);
        }
        return simpleTourneys;
    }

    @GetMapping("/historyOrganizer/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<SimpleTourney> historyOrganizer(@PathVariable("id")Integer id)
    {
        new Tournament();
        List<Tournament> tournaments = (List) StreamSupport.stream(this.tournamentService.findHistoryOrganizer(id).spliterator(), false).collect(Collectors.toList());
        List<SimpleTourney> simpleTourneys = new ArrayList<>();
        for (int i = 0; i < tournaments.size(); i++)
        {
            Tournament tournament = (Tournament)tournaments.get(i);
            SimpleTourney simpleTourney = new SimpleTourney();
            simpleTourney.setId(tournament.getId());
            simpleTourney.setName(tournament.getName());
            simpleTourneys.add(simpleTourney);
        }
        return simpleTourneys;
    }

    @GetMapping("/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> justTournament(@PathVariable("id") Integer id)
    {
        Optional<Tournament> tournamentOptional = this.tournamentService.findById(id);
        TourneyComplete tourneyComplete = new TourneyComplete();
        if (!tournamentOptional.isPresent())
        {
            return ResponseEntity.notFound().build();
        }
        Optional<User> userOptional = this.userService.findById(((Tournament)tournamentOptional.get()).getIdUser());
        Optional<Academy> academyOptional = this.academyService.findById(((User)userOptional.get()).getIdAcademy());
        Optional<State> stateOptional = this.stateService.findById(((Academy)academyOptional.get()).getIdState());
        Optional<Country> countryOptional = this.countryService.findById(((State)stateOptional.get()).getIdCountry());

        tourneyComplete.setId(((Tournament)tournamentOptional.get()).getId());
        tourneyComplete.setNameOrganizer(((User)userOptional.get()).getName());
        tourneyComplete.setDateStart(((Tournament)tournamentOptional.get()).getDateStart());
        tourneyComplete.setDateFinish(((Tournament)tournamentOptional.get()).getDateFinish());
        tourneyComplete.setName(((Tournament)tournamentOptional.get()).getName());
        tourneyComplete.setAddress(((Tournament)tournamentOptional.get()).getAddress());
        tourneyComplete.setStatus(((Tournament)tournamentOptional.get()).isStatus());
        tourneyComplete.setType(((Tournament)tournamentOptional.get()).isType());
        tourneyComplete.setAreas(((Tournament)tournamentOptional.get()).getAreas());
        tourneyComplete.setCountry(((Country)countryOptional.get()).getName());
        tourneyComplete.setCode(((Tournament)tournamentOptional.get()).getCode());

        return ResponseEntity.ok(tourneyComplete);
    }

    @GetMapping("/categoryMode/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<SimpleMode> getModesCategories(@PathVariable("id") Integer id)
    {
        Optional<Tournament> tournamentOptional = this.tournamentService.findById(id);
        List<SimpleMode> simpleModes = new ArrayList<>();
        if (!tournamentOptional.isPresent())
        {
            return simpleModes;
        }
        List <TourneyMode> tourneyModes = this.tourneyModeService.findTourneysModes(id);
        for (int i = 0; i < tourneyModes.size(); i++)
        {
            SimpleMode simpleMode = new SimpleMode();
            Optional<Mode> mode = this.modeService.findById(tourneyModes.get(i).getIdMode());
            simpleMode.setId(tourneyModes.get(i).getId());
            simpleMode.setName(((Mode)mode.get()).getName());
            List<CategoryMode> categoryModes = this.categoryModeService.findCategories(simpleMode.getId());
            List<SimpleCategory> simpleCategories = new ArrayList<>();
            for (int j = 0; j < categoryModes.size(); j++)
            {
                SimpleCategory simpleCategory = new SimpleCategory();
                Optional<Band> band = this.bandService.findById(categoryModes.get(j).getBandStart());
                simpleCategory.setId(categoryModes.get(j).getId());
                simpleCategory.setColor(((Band)band.get()).getColor());
                //int age = ((Tournament)tournamentOptional.get()).getDateFinish().compareTo(((CategoryMode)categoryModes.get(j)).getAgeStart());
                int age = ((Tournament)tournamentOptional.get()).getDateFinish().getYear() - ((CategoryMode)categoryModes.get(j)).getAgeStart().getYear();
                simpleCategory.setInitialAge(age);
                if (((CategoryMode)categoryModes.get(j)).isGender())
                {
                    simpleCategory.setSex("Masculino");
                }
                else {
                    simpleCategory.setSex("Femenino");
                }
                simpleCategory.setCode(((CategoryMode)categoryModes.get(j)).getCode());
                simpleCategories.add(simpleCategory);
            }
            simpleMode.setCategories(simpleCategories);
            simpleModes.add(simpleMode);
        }

        return simpleModes;
    }

    @GetMapping("/completeCategories/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<CategoryMode> getCompleteCategories(@PathVariable("id") Integer id)
    {
       if(this.categoryModeService.findCategoriesTourney(id).isEmpty())
       {
           return new ArrayList<CategoryMode>();
       }

       return this.categoryModeService.findCategoriesTourney(id);

    }


    @GetMapping("/organizerActive/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public Tournament getActiveTourneyOrganizer(@PathVariable("id") Integer id)
    {
        Tournament tournament = new Tournament();
        tournament.setId(0);
        if (this.tournamentService.findActiveTournamentOrganizer(id) == null)
        {
            return tournament;
        }
        tournament = this.tournamentService.findActiveTournamentOrganizer(id);
        return tournament;
    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody Tournament tournament) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.tournamentService.save(tournament));
    }

    @GetMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<Tournament> getTournaments()
    {
        return (List) StreamSupport.stream(this.tournamentService.findAll().spliterator(), false).collect(Collectors.toList());
    }

}
