package com.example.demo.entity;

public class CategoryChange
{
    private CategoryComplete category;
    private CategoryComplete categoryChange;

    public CategoryChange()
    {

    }

    public CategoryComplete getCategory() {
        return category;
    }

    public void setCategory(CategoryComplete category) {
        this.category = category;
    }

    public CategoryComplete getCategoryChange() {
        return categoryChange;
    }

    public void setCategoryChange(CategoryComplete categoryChange) {
        this.categoryChange = categoryChange;
    }
}
