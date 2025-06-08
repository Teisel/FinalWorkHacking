package com.example.demo.entity;

import java.util.Date;

public class CategoryComplete {
    private int id; //ya
    private String mode; //ya
    private int idMode; //ya
    private String sex; //ya
    private boolean sexBool; //ya
    private Date initialAge; //ya
    private Date finalAge; //ya
    private int ageStart; //ya
    private int ageFinish; //ya
    private String code; //ya
    private int idBandStart; //ya
    private int idBandEnd; //ya
    private String bandStart; //ya
    private String bandEnd; //ya
    private float initialWeight;
    private float finalWeight;
    private boolean state;
    private boolean end;
    private boolean define;

    public CategoryComplete()
    {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public int getIdMode() {
        return idMode;
    }

    public void setIdMode(int idMode) {
        this.idMode = idMode;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public boolean isSexBool() {
        return sexBool;
    }

    public void setSexBool(boolean sexBool) {
        this.sexBool = sexBool;
    }

    public Date getInitialAge() {
        return initialAge;
    }

    public void setInitialAge(Date initialAge) {
        this.initialAge = initialAge;
    }

    public Date getFinalAge() {
        return finalAge;
    }

    public void setFinalAge(Date finalAge) {
        this.finalAge = finalAge;
    }

    public int getAgeStart() {
        return ageStart;
    }

    public void setAgeStart(int ageStart) {
        this.ageStart = ageStart;
    }

    public int getAgeFinish() {
        return ageFinish;
    }

    public void setAgeFinish(int ageFinish) {
        this.ageFinish = ageFinish;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getIdBandStart() {
        return idBandStart;
    }

    public void setIdBandStart(int idBandStart) {
        this.idBandStart = idBandStart;
    }

    public int getIdBandEnd() {
        return idBandEnd;
    }

    public void setIdBandEnd(int idBandEnd) {
        this.idBandEnd = idBandEnd;
    }

    public String getBandStart() {
        return bandStart;
    }

    public void setBandStart(String bandStart) {
        this.bandStart = bandStart;
    }

    public String getBandEnd() {
        return bandEnd;
    }

    public void setBandEnd(String bandEnd) {
        this.bandEnd = bandEnd;
    }

    public float getInitialWeight() {
        return initialWeight;
    }

    public void setInitialWeight(float initialWeight) {
        this.initialWeight = initialWeight;
    }

    public float getFinalWeight() {
        return finalWeight;
    }

    public void setFinalWeight(float finalWeight) {
        this.finalWeight = finalWeight;
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
