package com.example.demo.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(
        name = "usuario"
)
public class User implements Serializable {
    private static final long serialVersionUID = 42L;
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    @Column(
            name = "idusuario"
    )
    private Integer id;
    @Column(
            name = "idescuela"
    )
    private int idAcademy;
    @Column(
            length = 100,
            name = "nombre"
    )
    private String name;
    @Column(
            name = "fechanacimiento"
    )
    private Date bornDate;
    @Column(
            name = "sexo"
    )
    private boolean gender;
    @Column (
            name = "foto"
    )
    private String pic;
    @Column(
            length = 100,
            name = "correo"
    )
    private String email;
    @Column(
            length = 100,
            name = "contrasena"
    )
    private String password;
    @Column(
            name = "tipo",
            length = 11
    )
    private String typeUser;

    public User() {
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdAcademy() {
        return this.idAcademy;
    }

    public void setIdAcademy(int idAcademy) {
        this.idAcademy = idAcademy;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBornDate() {
        return this.bornDate;
    }

    public void setBornDate(Date bornDate) {
        this.bornDate = bornDate;
    }

    public boolean isGender() {
        return this.gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTypeUser() {
        return this.typeUser;
    }

    public void setTypeUser(String typeUser) {
        this.typeUser = typeUser;
    }
}
