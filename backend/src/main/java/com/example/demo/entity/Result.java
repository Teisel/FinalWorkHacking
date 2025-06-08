package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "resultado"
)
public class Result implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idresultado"
    )
    private Integer id;
    @Column(
            name = "idcategoria"
    )
    private int idCategory;
    @Column(
            name = "ronda"
    )
    private int round;
    @Column(
            name = "idganador"
    )
    private int winner;
    @Column(
            name = "idperdedor"
    )
    private int loser;
    @Column(
            name = "idnextres"
    )
    private int nextRes;
    @Column(
            name = "idrespreva"
    )
    private int resPrevA;
    @Column(
            name = "idresprevb"
    )
    private int resPrevB;

    public Result() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdCategory() {
        return this.idCategory;
    }

    public void setIdCategory(int idCategory) {
        this.idCategory = idCategory;
    }

    public int getRound() {
        return this.round;
    }

    public void setRound(int round) {
        this.round = round;
    }

    public int getWinner() {
        return winner;
    }

    public void setWinner(int winner) {
        this.winner = winner;
    }

    public int getNextRes() {
        return nextRes;
    }

    public void setNextRes(int nextRes) {
        this.nextRes = nextRes;
    }

    public int getResPrevA() {
        return resPrevA;
    }

    public void setResPrevA(int resPrevA) {
        this.resPrevA = resPrevA;
    }

    public int getResPrevB() {
        return resPrevB;
    }

    public void setResPrevB(int resPrevB) {
        this.resPrevB = resPrevB;
    }

    public int getLoser() {
        return loser;
    }

    public void setLoser(int loser) {
        this.loser = loser;
    }
}
