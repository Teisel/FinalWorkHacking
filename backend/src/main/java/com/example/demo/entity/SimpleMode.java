package com.example.demo.entity;

import java.util.List;

public class SimpleMode {
    private List<SimpleCategory> categories;
    private String name;
    private int id;

    public SimpleMode(){}

    public List<SimpleCategory> getCategories() {
        return categories;
    }

    public void setCategories(List<SimpleCategory> categories) {
        this.categories = categories;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
