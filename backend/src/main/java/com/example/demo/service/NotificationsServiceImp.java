package com.example.demo.service;

import com.example.demo.entity.Notifications;
import com.example.demo.repository.NotificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationsServiceImp implements NotificationsService{
    @Autowired
    private NotificationsRepository notificationsRepository;

    public NotificationsServiceImp()
    {
    }

    @Transactional(
            readOnly = true
    )
    public Iterable<Notifications> findAll() {
        return this.notificationsRepository.findAll();
    }

    @Transactional(
            readOnly = true
    )
    public Page<Notifications> findAll(Pageable pageable) {
        return this.notificationsRepository.findAll(pageable);
    }

    @Transactional
    public Optional<Notifications> findById(Integer id) {
        return this.notificationsRepository.findById(id);
    }

    @Transactional
    public Notifications save(Notifications notifications) {
        return (Notifications)this.notificationsRepository.save(notifications);
    }

    @Override
    public void deleteById(Integer id) {
        this.notificationsRepository.deleteById(id);
    }

    @Override
    public List<Notifications> findSomeNotifications(Integer idUser) {
        return this.notificationsRepository.findSomeNotifications(idUser);
    }
}
