package com.example.demo.controller;

import com.example.demo.entity.Notifications;
import com.example.demo.service.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationsDTO {
    @Autowired
    private NotificationsService notificationsService;

    public NotificationsDTO()
    {

    }

    @GetMapping({"/{id}"})
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public List<Notifications> allNotificationsUser(@PathVariable("id")Integer id)
    {
        return this.notificationsService.findSomeNotifications(id);
    }

    @PostMapping
    @CrossOrigin(
            origins = {"http://localhost:3000"}
    )
    public ResponseEntity<?> create(@RequestBody Notifications notifications)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.notificationsService.save(notifications));
    }
}
