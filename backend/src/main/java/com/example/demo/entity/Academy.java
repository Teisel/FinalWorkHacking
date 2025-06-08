package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(
        name = "escuela"
)
public class Academy {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idescuela"
    )
    private Integer id;
    @Column(
            length = 20,
            name = "nombre"
    )
    private String name;
    @Column(
            length = 100,
            name = "direccion"
    )
    private String direction;
    @Column(
            name = "idestado"
    )
    private int idState;

    public Academy() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDirection() {
        return this.direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public int getIdState() {
        return this.idState;
    }

    public void setIdState(int idState) {
        this.idState = idState;
    }
}
