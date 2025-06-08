package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "participante"
)
public class Competitor implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idparticipante"
    )
    private Integer id;
    @Column(
            name = "idusuario"
    )
    private int idUser;
    @Column(
            name = "idcategoria"
    )
    private int idCategory;
    @Column(
            name = "lugar"
    )
    private int place;

    @Column(
            name = "verificado"
    )
    private boolean verify;

    public Competitor() {
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

    public int getIdCategory() {
        return this.idCategory;
    }

    public void setIdCategory(int idCategory) {
        this.idCategory = idCategory;
    }

    public int getPlace() {
        return place;
    }

    public void setPlace(int place) {
        this.place = place;
    }

    public boolean isVerify() {
        return verify;
    }

    public void setVerify(boolean verify) {
        this.verify = verify;
    }
}
