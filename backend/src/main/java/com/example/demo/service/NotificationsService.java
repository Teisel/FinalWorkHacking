package com.example.demo.service;

import com.example.demo.entity.Notifications;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface NotificationsService {
    Iterable<Notifications> findAll();

    Page<Notifications> findAll(Pageable pageable);

    Optional<Notifications> findById(Integer id);

    Notifications save(Notifications notifications);

    void deleteById(Integer id);

    List<Notifications> findSomeNotifications(Integer idUser);
}
