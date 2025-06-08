package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "tagsdeportista"
)
public class AthleteTags implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @Column(
            name = "idusuario"
    )
    private Integer id;
    @Column(
            name = "diferenciapuntos"
    )
    private boolean dP;
    @Column(
            name = "faltas"
    )
    private boolean fouls;
    @Column(
            name = "ganador"
    )
    private boolean winner;
    @Column(
            name = "top3"
    )
    private boolean top3;
    @Column(
            name = "nofaltas"
    )
    private boolean noFouls;

    public AthleteTags() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isdP() {
        return this.dP;
    }

    public void setdP(boolean dP) {
        this.dP = dP;
    }

    public boolean isFouls() {
        return this.fouls;
    }

    public void setFouls(boolean fouls) {
        this.fouls = fouls;
    }

    public boolean isWinner() {
        return this.winner;
    }

    public void setWinner(boolean winner) {
        this.winner = winner;
    }

    public boolean isTop3() {
        return this.top3;
    }

    public void setTop3(boolean top3) {
        this.top3 = top3;
    }

    public boolean isNoFouls() {
        return this.noFouls;
    }

    public void setNoFouls(boolean noFouls) {
        this.noFouls = noFouls;
    }
}

