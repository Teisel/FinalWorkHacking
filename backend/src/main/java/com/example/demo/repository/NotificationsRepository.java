package com.example.demo.repository;

import com.example.demo.entity.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationsRepository extends JpaRepository<Notifications, Integer> {
    @Query(
            value = "SELECT * FROM notificaciones " +
                    "WHERE idUsuario = ?1",
            nativeQuery = true
    )
    List<Notifications> findSomeNotifications(Integer idUser);
}
