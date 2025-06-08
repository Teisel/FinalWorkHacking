package com.example.demo.entity;

public class CompleteCompetitor {
    private Integer id;
    private int idUser;
    private int idCategory;
    private String name;
    private int idAcademy;
    private int place;

    public CompleteCompetitor()
    {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public int getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(int idCategory) {
        this.idCategory = idCategory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIdAcademy() {
        return idAcademy;
    }

    public void setIdAcademy(int idAcademy) {
        this.idAcademy = idAcademy;
    }

    public int getPlace() {
        return place;
    }

    public void setPlace(int place) {
        this.place = place;
    }
}
