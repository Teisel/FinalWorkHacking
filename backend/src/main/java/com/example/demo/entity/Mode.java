package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "modalidad"
)
public class Mode implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idtipomodalidad"
    )
    private Integer id;
    @Column(
            length = 20,
            name = "nombre"
    )
    private String name;

    public Mode() {
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
}

