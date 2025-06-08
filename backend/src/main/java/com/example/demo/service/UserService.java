package com.example.demo.service;

import com.example.demo.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Iterable<User> findAll();

    Page<User> findAll(Pageable pageable);

    Optional<User> findById(Integer id);

    User save(User us);

    void deleteById(Integer id);

    List<User> searchUsers(String word);

    List<User> searchCompetitors(List<Integer> ids);
}