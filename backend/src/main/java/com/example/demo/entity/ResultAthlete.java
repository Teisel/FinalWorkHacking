package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "resultadodep"
)
public class ResultAthlete implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idresultdep"
    )
    private Integer id;
    @Column(
            name = "idresultado"
    )
    private int idResult;
    @Column(
            name = "idparticipante"
    )
    private int idCompetitor;
    @Column(
            name = "faltas"
    )
    private int fouls;
    @Column(
            name = "puntos"
    )
    private int points;

    public ResultAthlete() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdResult() {
        return this.idResult;
    }

    public void setIdResult(int idResult) {
        this.idResult = idResult;
    }

    public int getIdCompetitor() {
        return this.idCompetitor;
    }

    public void setIdCompetitor(int idCompetitor) {
        this.idCompetitor = idCompetitor;
    }

    public int getFouls() {
        return this.fouls;
    }

    public void setFouls(int fouls) {
        this.fouls = fouls;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
