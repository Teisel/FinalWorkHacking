package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(
        name = "categoriasmodalidad"
)
public class CategoryMode implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idcategoria"
    )
    private Integer id;
    @Column(
            name = "idmodalidad"
    )
    private int idMode;
    @Column(
            name = "sexo"
    )
    private boolean gender;
    @Column(
            name = "edadinicial"
    )
    private Date ageStart;
    @Column(
            name = "edadfinal"
    )
    private Date ageFinish;
    @Column(
            length = 100,
            name = "codigo"
    )
    private String code;

    @Column(
            name = "cintainicial"
    )
    private int bandStart;

    @Column(
            name = "cintafinal"
    )
    private int bandEnd;

    @Column(
            name = "pesoinicial"
    )
    private float weightStart;

    @Column(
            name = "pesofinal"
    )
    private float weightEnd;

    @Column(
            name = "state"
    )
    private boolean state;

    @Column(
            name = "end"
    )
    private boolean end;

    @Column(
            name = "define"
    )
    private boolean define;

    public CategoryMode() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdMode() {
        return this.idMode;
    }

    public void setIdMode(int idMode) {
        this.idMode = idMode;
    }

    public boolean isGender() {
        return this.gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public Date getAgeStart() {
        return this.ageStart;
    }

    public void setAgeStart(Date ageStart) {
        this.ageStart = ageStart;
    }

    public Date getAgeFinish() {
        return this.ageFinish;
    }

    public void setAgeFinish(Date ageFinish) {
        this.ageFinish = ageFinish;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getBandStart() {
        return bandStart;
    }

    public void setBandStart(int bandStart) {
        this.bandStart = bandStart;
    }

    public int getBandEnd() {
        return bandEnd;
    }

    public void setBandEnd(int bandEnd) {
        this.bandEnd = bandEnd;
    }

    public float getWeightStart() {
        return weightStart;
    }

    public void setWeightStart(float weightStart) {
        this.weightStart = weightStart;
    }

    public float getWeightEnd() {
        return weightEnd;
    }

    public void setWeightEnd(float weightEnd) {
        this.weightEnd = weightEnd;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public boolean isEnd() {
        return end;
    }

    public void setEnd(boolean end) {
        this.end = end;
    }

    public boolean isDefine() {
        return define;
    }

    public void setDefine(boolean define) {
        this.define = define;
    }
}