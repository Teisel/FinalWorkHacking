package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(
        name = "torneo"
)
public class Tournament implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idtorneo"
    )
    private Integer id;
    @Column(
            name = "idusuario"
    )
    private int idUser;
    @Column(
            name = "fechainicio"
    )
    private Date dateStart;
    @Column(
            name = "fechafin"
    )
    private Date dateFinish;
    @Column(
            length = 100,
            name = "nombre"
    )
    private String name;
    @Column(
            length = 100,
            name = "direccion"
    )
    private String address;
    @Column(
            name = "status"
    )
    private boolean status;
    @Column(
            name = "tipo"
    )
    private boolean type;
    @Column(
            name = "areasdisponibles"
    )
    private int areas;
    @Column(
            name = "codigo"
    )
    private String code;

    public Tournament() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdUser() {
        return this.idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public Date getDateStart() {
        return this.dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateFinish() {
        return this.dateFinish;
    }

    public void setDateFinish(Date dateFinish) {
        this.dateFinish = dateFinish;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isStatus() {
        return this.status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isType() {
        return this.type;
    }

    public void setType(boolean type) {
        this.type = type;
    }

    public int getAreas() {
        return this.areas;
    }

    public void setAreas(int areas) {
        this.areas = areas;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

