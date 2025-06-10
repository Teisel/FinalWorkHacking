import { Fragment } from "react";
import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import { decifrar, cifrar } from "./EncDec.jsx";

//const bcrypt = require('bcryptjs');
const verify = "http://localhost:8080/api/users/verify/";
const completeUser = "http://localhost:8080/api/usersComplete/";
const User = "User.user";

//Teisel Rivera
export class LogIn extends Component {

    state = {
        data: []
    }

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        if (userSesion) {
            window.location.href = "http://localhost:3000/";
        }
    };

    render() {
        return (
            <Fragment>
                {this.useEffect()}
                <div id="contenedorLogIn">
                    <div className="divElLog">
                        <label className="textLogin">Inicio de sesión</label>
                    </div>
                    <div className="divElLog">
                        <hr size="5" />
                    </div>
                    <div align="center">
                        <Link to="/">
                            <img src="Logo1.png" alt="..." className="imgLogIn" />
                        </Link>
                    </div>
                    <Formik
                        initialValues={
                            {
                                email: '',
                                password: ''
                            }
                        }
                        validate={(valores) => {
                            let errores = {};
                            if (!valores.email) {
                                errores.email = 'Ingrese un correo';

                            }
                            console.log(errores.email);
                            return errores;
                        }}

                        onSubmit={async (valores) => {
                            try {
                                await axios.get(verify + valores.email).then(Response => {
                                    this.setState({ data: Response.data });
                                    if (Response.data.name != null) {
                                        console.log(decifrar(this.state.data.password))
                                        if (valores.password === decifrar(Response.data.password)) {
                                            console.log("Contraseña correcta");
                                            axios.get(completeUser + Response.data.id).then(Response => {
                                                if (Response.data.name != null) {
                                                    localStorage.setItem(User, JSON.stringify(Response.data));
                                                    window.location.href = "http://localhost:3000/";
                                                }
                                            })

                                        }
                                        else {
                                            console.log("Pura verga");
                                        }
                                    }
                                });
                            }
                            catch (e) {
                                console.log(e);
                            }

                        }}
                    >
                        {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="divElLog">
                                    <label className="textLogin">Correo</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        id="inputEmailLogin" />
                                    {touched.email && errors.email && <label className="textError">{errors.email}</label>}
                                </div>
                                <div className="divElLog">
                                    <label className="textLogin">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        id="inputPasswordLogIn" />
                                </div>
                                <div className="divElLog">
                                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                                </div>
                            </form>
                        )}

                    </Formik>
                    <div className="divElLog">
                        <hr size="5" />
                    </div>
                    <div className="divElLog">
                        <Link to="/SingIn">
                            <button type="button" className="btn btn-primary">Registrase</button>
                        </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}