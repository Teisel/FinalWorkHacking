package com.example.demo.entity;

import java.util.List;

public class CompleteResult {
    private List<ResultAthlete> resultAthletes;
    private Result result;

    public CompleteResult()
    {

    }

    public List<ResultAthlete> getResultAthletes() {
        return resultAthletes;
    }

    public void setResultAthletes(List<ResultAthlete> resultAthletes) {
        this.resultAthletes = resultAthletes;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }
}
