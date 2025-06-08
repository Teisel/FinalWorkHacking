package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/category")
public class CategoryDTO {

    @Autowired
    private CategoryModeService categoryModeService;

    @Autowired
    private TourneyModeService tourneyModeService;

    @Autowired
    private ModeService modeService;

    @Autowired
    private BandService bandService;

    @Autowired
    private CompetitorService competitorService;

    @Autowired
    private NotificationsService notificationsService;

    public CategoryDTO(){
    }

    @GetMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<CategoryComplete> readSome(@PathVariable("id") Integer id)
    {
        List<CategoryMode> categoryModes = this.categoryModeService.findCategoriesTourney(id);
        List<CategoryComplete> categoryCompletes = new ArrayList<>();
        for (int i = 0; i <  categoryModes.size(); i++)
        {
            CategoryMode categoryMode = (CategoryMode) categoryModes.get(i);
            categoryCompletes.add(transformCategory(categoryMode));
        }
        return categoryCompletes;
    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody CategoryMode categoryMode)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.categoryModeService.save(categoryMode));
    }

    @GetMapping("/categoriesModify/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<CategoryChange> getPossibleCategoriesChange(@PathVariable("id") Integer id)
    {
        List<TourneyMode> tourneyModes = this.tourneyModeService.findTourneysModes(id);
        List<CategoryChange> categoryChanges = new ArrayList<>();
        if(!tourneyModes.isEmpty())
        {
            for (int i = 0; i < tourneyModes.size(); i++)
            {
                TourneyMode tourneyMode = tourneyModes.get(i);
                List<CategoryMode> categoryModes = this.categoryModeService.findCategories(tourneyMode.getId());
                if (!categoryModes.isEmpty())
                {
                    for (int j = 0; j < categoryModes.size(); j++)
                    {
                        CategoryMode categoryMode = categoryModes.get(j);
                        Optional<CategoryMode> categoryMode1 = (Optional<CategoryMode>) this.categoryModeService.findPossibleChange(
                                categoryMode.getAgeStart(),
                                categoryMode.getAgeFinish(),
                                categoryMode.getBandStart(),
                                categoryMode.getBandEnd(),
                                categoryMode.getWeightStart(),
                                categoryMode.getWeightEnd(),
                                categoryMode.isGender(),
                                categoryMode.getId(),
                                categoryMode.getIdMode()
                        );
                        if (categoryMode1.isPresent())
                        {
                            CategoryChange categoryChange = new CategoryChange();
                            categoryChange.setCategory(transformCategory(categoryMode));
                            categoryChange.setCategoryChange(transformCategory(categoryMode1.get()));
                            categoryChanges.add(categoryChange);

                        }
                    }
                }

            }
        }
        return categoryChanges;
    }

    @DeleteMapping({"/{catA}/{catB}/{catC}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> deleteCategories(@PathVariable("catA") Integer catA, @PathVariable("catB") Integer catB, @PathVariable("catC") Integer catC)
    {
        List<Competitor> competitors = this.competitorService.getCompetitors(catA);
        List<Competitor> competitors1 = this.competitorService.getCompetitors(catB);

        for (int i = 0; i < competitors1.size() ; i++)
        {
            competitors.add(competitors1.get(i));
        }

        for (int i = 0; i < competitors.size() ; i++)
        {
            Notifications notifications = new Notifications();
            this.competitorService.deleteById(competitors.get(i).getId());
            competitors.get(i).setIdCategory(catC);
            competitors.get(i).setId(null);
            this.competitorService.save(competitors.get(i));
            //Aqui merengues se crea la notificación
            notifications.setIdUser(competitors.get(i).getIdUser());
            notifications.setText("Has sido cambiado de categoria");

            this.notificationsService.save(notifications);

        }

        this.categoryModeService.deleteById(catA);
        this.categoryModeService.deleteById(catB);

        return  ResponseEntity.ok().build();
    }

    @PutMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> update(@RequestBody CategoryMode categoryMode, @PathVariable("id") Integer id) {
        Optional<CategoryMode> optionalCategoryMode = this.categoryModeService.findById(id);
        if (!optionalCategoryMode.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            CategoryMode updatedCategory = (CategoryMode) optionalCategoryMode.get();

            updatedCategory.setAgeFinish(categoryMode.getAgeFinish());
            updatedCategory.setAgeStart(categoryMode.getAgeStart());
            updatedCategory.setBandEnd(categoryMode.getBandEnd());
            updatedCategory.setBandStart(categoryMode.getBandStart());
            updatedCategory.setCode(categoryMode.getCode());
            updatedCategory.setEnd(categoryMode.isEnd());
            updatedCategory.setDefine(categoryMode.isDefine());
            updatedCategory.setGender(categoryMode.isGender());
            updatedCategory.setIdMode(categoryMode.getIdMode());
            updatedCategory.setState(categoryMode.isState());
            updatedCategory.setWeightEnd(categoryMode.getWeightEnd());
            updatedCategory.setWeightStart(categoryMode.getWeightStart());

            return ResponseEntity.status(HttpStatus.CREATED).body(this.categoryModeService.save(updatedCategory));
        }
    }

    @GetMapping("/allCompleteCategories/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<CategoryComplete> getAllCompleteCategories(@PathVariable("id") Integer id)
    {
        if(this.categoryModeService.findCategoriesTourney(id).isEmpty())
        {
            return new ArrayList<CategoryComplete>();
        }
        List<CategoryMode> categoryModes = this.categoryModeService.findCategoriesTourney(id);
        List<CategoryComplete> categoryCompletes = new ArrayList<>();
        for (int i = 0; i < categoryModes.size(); i++)
        {
            categoryCompletes.add(transformCategory(categoryModes.get(i)));
        }

        return categoryCompletes;

    }

    public CategoryComplete transformCategory (CategoryMode categoryMode)
    {
        CategoryComplete categoryComplete = new CategoryComplete();

        categoryComplete.setId(categoryMode.getId());
        categoryComplete.setIdMode(categoryMode.getIdMode());
        categoryComplete.setSexBool(categoryMode.isGender());
        categoryComplete.setInitialAge(categoryMode.getAgeStart());
        categoryComplete.setFinalAge(categoryMode.getAgeFinish());
        categoryComplete.setCode(categoryMode.getCode());
        categoryComplete.setIdBandStart(categoryMode.getBandStart());
        categoryComplete.setIdBandEnd(categoryMode.getBandEnd());
        categoryComplete.setMode(
                ((Mode) this.modeService.findById(
                        ((TourneyMode) this.tourneyModeService.findById(
                                categoryComplete.getIdMode()
                        ).get()).getIdMode()
                ).get()).getName()
        );
        if (categoryComplete.isSexBool())
        {
            categoryComplete.setSex("Masculino");
        }
        else {
            categoryComplete.setSex("Femenino");
        }
        categoryComplete.setAgeStart(categoryComplete.getInitialAge().getYear() + 1900);
        categoryComplete.setAgeFinish(categoryComplete.getFinalAge().getYear() + 1900);
        categoryComplete.setBandStart(
                (((Band) this.bandService.findById(categoryComplete.getIdBandStart()).get()).getColor())
        );
        categoryComplete.setBandEnd(
                (((Band) this.bandService.findById(categoryComplete.getIdBandEnd()).get()).getColor())
        );
        categoryComplete.setInitialWeight(categoryMode.getWeightStart());
        categoryComplete.setFinalWeight(categoryMode.getWeightEnd());
        categoryComplete.setState(categoryMode.isState());
        categoryComplete.setEnd(categoryMode.isEnd());
        categoryComplete.setDefine(categoryMode.isDefine());
        return categoryComplete;
    }
}
