package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.AcademyService;
import com.example.demo.service.CountryService;
import com.example.demo.service.StateService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping({"/api/usersComplete"})
public class CompleteUserDTO {
    @Autowired
    private UserService userService;
    @Autowired
    private AcademyService academyService;
    @Autowired
    private StateService stateService;
    @Autowired
    private CountryService countryService;

    public CompleteUserDTO() {
    }

    @GetMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> read(@PathVariable("id") Integer id) {
        new User();
        List<User> users = (List)StreamSupport.stream(this.userService.findAll().spliterator(), false).collect(Collectors.toList());

        for(int i = 0; i < users.size(); ++i) {
            User user = (User)users.get(i);
            if (user.getId().equals(id)) {
                CompleteUser completeUser = new CompleteUser();
                Optional<Academy> academyOptional = this.academyService.findById(user.getIdAcademy());
                Optional<State> stateOptional = this.stateService.findById(((Academy)academyOptional.get()).getIdState());
                Optional<Country> countryOptional = this.countryService.findById(((State)stateOptional.get()).getIdCountry());
                completeUser.setId(user.getId());
                completeUser.setName(user.getName());
                completeUser.setPassword(user.getPassword());
                completeUser.setAcademy(((Academy)academyOptional.get()).getName());
                completeUser.setState(((State)stateOptional.get()).getName());
                completeUser.setCountry(((Country)countryOptional.get()).getName());
                completeUser.setGender(user.isGender());
                completeUser.setPic(user.getPic());
                completeUser.setBirthDate(user.getBornDate());
                completeUser.setEmail(user.getEmail());
                completeUser.setType(user.getTypeUser());
                return ResponseEntity.ok(completeUser);
            }
        }

        return ResponseEntity.notFound().build();
    }
}
