package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "estado"
)
public class State implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idestado"
    )
    private Integer id;
    @Column(
            name = "idnacion"
    )
    private int idCountry;
    @Column(
            length = 100,
            name = "nombre"
    )
    private String name;

    public State() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdCountry() {
        return this.idCountry;
    }

    public void setIdCountry(int idCountry) {
        this.idCountry = idCountry;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
