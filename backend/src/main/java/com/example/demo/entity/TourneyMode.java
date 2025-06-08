package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(
        name = "modalidadestorneo"
)
public class TourneyMode implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idmodalidad"
    )
    private Integer id;
    @Column(
            name = "idtorneo"
    )
    private int idTourney;
    @Column(
            name = "idtipomodalidad"
    )
    private int idMode;

    public TourneyMode() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdTourney() {
        return this.idTourney;
    }

    public void setIdTourney(int idTourney) {
        this.idTourney = idTourney;
    }

    public int getIdMode() {
        return this.idMode;
    }

    public void setIdMode(int idMode) {
        this.idMode = idMode;
    }
}

