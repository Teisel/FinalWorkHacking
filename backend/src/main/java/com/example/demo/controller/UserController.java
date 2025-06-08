package com.example.demo.controller;

import com.example.demo.entity.Competitor;
import com.example.demo.entity.User;
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
@RequestMapping({"/api/users"})
public class UserController {
    @Autowired
    private UserService usSe;

    @Autowired
    private CompetitorService competitorService;

    public UserController() {
    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody User us) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.usSe.save(us));
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<?> read(@PathVariable("id") Integer id) {
        Optional<User> optionalUser = this.usSe.findById(id);
        return !optionalUser.isPresent() ? ResponseEntity.notFound().build() : ResponseEntity.ok(optionalUser);
    }

    @PutMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> update(@RequestBody User us, @PathVariable("id") Integer id) {
        Optional<User> userOptional = this.usSe.findById(id);
        if (!userOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            ((User) userOptional.get()).setIdAcademy(us.getIdAcademy());
            ((User) userOptional.get()).setName(us.getName());
            ((User) userOptional.get()).setBornDate(us.getBornDate());
            ((User) userOptional.get()).setGender(us.isGender());
            ((User) userOptional.get()).setPic(us.getPic());
            ((User) userOptional.get()).setEmail(us.getEmail());
            ((User) userOptional.get()).setPassword(us.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body(this.usSe.save((User) userOptional.get()));
        }
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        if (!this.usSe.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            this.usSe.deleteById(id);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping
    public List<User> readAll() {
        List<User> users = (List) StreamSupport.stream(this.usSe.findAll().spliterator(), false).collect(Collectors.toList());
        return users;
    }

    @GetMapping({"/verify/{email}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public User verifyUser(@PathVariable("email") String email) {
        new User();
        List<User> users = this.readAll();
        for (int i = 0; i < users.size(); i++){
            User user = (User) users.get(i);
            if(user.getTypeUser().equals("anonimo"))
            {
                users.remove(i);
                i--;
            }
        }

        for (int i = 0; i < users.size(); ++i) {
            User us = (User) users.get(i);
            if (us.getEmail().equals(email)) {
                return us;
            }
        }

        return new User();
    }

    @GetMapping("/some/{word}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    List<User> searchSomeUsers(@PathVariable("word") String word){
        List<User> users = (List) StreamSupport.stream(this.usSe.searchUsers(word).spliterator(), false).collect(Collectors.toList());
        return users;
    }

    @GetMapping("/competitors/{id}")
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )

    List<User> competitorCategory (@PathVariable("id") Integer id)
    {
        List<User> userList = new ArrayList<User>();
        List<Competitor> competitors = this.competitorService.getCompetitors(id);
        List<Integer> ids = new ArrayList<Integer>();
        if(competitors.isEmpty())
        {
            return userList;
        }
        for (int i = 0; i < competitors.size(); i++)
        {
            ids.add(competitors.get(i).getIdUser());
        }
        userList = this.usSe.searchCompetitors(ids);
        return userList;
    }

}