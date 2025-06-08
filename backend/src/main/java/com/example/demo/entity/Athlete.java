package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(
        name = "deportista"
)
public class Athlete {
    private static final long serialVersionUID = 42L;
    @Id
    @Column(
            name = "idusuario"
    )
    private Integer id;
    @Column(
            name = "peso"
    )
    private float weight;
    @Column(
            name = "altura"
    )
    private float high;
    @Column(
            name = "idcinta"
    )
    private int idColor;

    public Athlete() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public float getWeight() {
        return this.weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public float getHigh() {
        return this.high;
    }

    public void setHigh(float high) {
        this.high = high;
    }

    public int getIdColor() {
        return this.idColor;
    }

    public void setIdColor(int idColor) {
        this.idColor = idColor;
    }
}

