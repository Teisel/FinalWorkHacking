import { Fragment } from "react";
import { Component } from "react/cjs/react.production.min";
import axios from "axios";
import { Formik } from "formik";
import { LoginButton } from "./LoginButton";
import { UserLoged } from "./UserLoged";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast as tostada } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = "User.user";
const tourneyFinish = "tourney.finish";
const tourneysActive = "http://localhost:8080/api/tourneyInfo/active";
const tourneysHistory = "http://localhost:8080/api/tourneyInfo/history";
const searchAthlete = "http://localhost:8080/api/users/some/";
const searchMode = "http://localhost:8080/api/category/";
const infoUserLink = "http://localhost:8080/api/athleteInfo/";
const competitorsLink = "http://localhost:8080/api/competitor";
const busqueda = "bus.que";
const userSearched = "user.searched";

let errorChido = null;
let user = null;
//Teisel Rivera
export class Inicio extends Component {

    state = {
        data: [],
        data2: [],
        data3: [],
        modes: [],
        atleta: [],
        idTorneo: []    
    }

    tostada = () => {
        tostada.success('Usuario inscrito correctamente', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    tostadaEvil = () => {
        tostada.error('Usuario no inscrito', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    notify = () => toast((t) => (
        <div>
            <h2 className="colorPerron">¿Desea inscribirse al torneo?</h2>
            <Formik
                initialValues={{
                    mode: 'Modalidad'
                }}

                validate={(valores) => {
                    let errores = {};
                    if (valores.mode === 'Modalidad') {
                        console.log("Sie entra");
                        errores.mode = "Favor de elegir una modalidad";
                    }
                    //console.log(errores);
                    return errores;
                }}

                onSubmit={async (valores) => {
                    if (await this.checkUser(valores.mode)) {
                        console.log("Inscrito");
                    }
                    toast.dismiss(t.id)
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                    <form onSubmit={handleSubmit} >
                        <div align="center" className="divInscri">
                            <select
                                className="form-select"
                                value={values.mode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="mode">
                                <option defaultValue>Modalidad</option>
                                {this.state.modes.map((category, i = 0) => {

                                    return (
                                        <option className="list-group-item" key={category.id.toString()} value={i++}>{category.sex.substring(0, 3) + " " + category.mode.substring(0, 3) + " " + category.initialWeight + "-" + category.finalWeight + " " + category.ageStart + "-" + category.ageFinish + " " + category.bandStart + "-" + category.bandEnd}</option>
                                    )

                                })}
                            </select>
                            {touched.mode && errors.mode && <label className="textError">{errors.mode}</label>}

                        </div>
                        <div className="divInscri">
                            <button className="btn btn-danger" type="button" id="botonCancelarInscri" onClick={() => toast.dismiss(t.id)}>Cancelar</button>

                            <button type="button" className="btn btn-info botonVerTorneo" onClick={() => { this.torneoTerminado(this.state.idTorneo) }}>Ver torneo</button>

                            <button type="submit" className="btn btn-primary">Ok</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    ));

    checkUser = async (idCategory) => {
        let category = this.state.modes[idCategory];
        let year = ("" + user.birthDate).substring(0, 4);
        year = year - 0;
        if (
            (category.initialWeight <= this.state.atleta.weight <= category.finalWeight) &&
            (category.idBandStart <= this.state.atleta.idColor <= category.idBandEnd) &&
            (category.ageFinish <= year) &&
            (year <= category.ageStart) &&
            (category.sexBool === user.gender) &&
            (await this.estaInscrito(category.id))
        ) {
            let competitor = {
                idUser: user.id,
                idCategory: category.id

            }
            axios.post(competitorsLink, competitor)
                .then(Response => {
                    console.log(Response)
                })
                .catch(error => {
                    console.log(error)
                })
            this.tostada();
        }
        else {
            this.tostadaEvil();
        }
    }

    estaInscrito = async (idCategoria) => {
        let ret = null;
        await axios.get(competitorsLink + "/" + idCategoria + "/" + user.id).then(Response => {
            console.log(Response.data)
            ret = Response.data
        });
        console.log(ret);
        return ret;
    }

    torneoTerminado = (id) => {
        localStorage.setItem(tourneyFinish, JSON.stringify(id));
        window.location.href = "http://localhost:3000/FinishTourney";
    }


    logOutUser = () => {
        localStorage.removeItem(User);
        console.log("Hahahaa pendejo")
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        if (userSesion) {
            user = userSesion;

        }
        else {
            user = null;
        }

    };

    peticionGet = () => {
        axios.get(tourneysHistory).then(Response => {
            this.setState({ data: Response.data });
        });

        axios.get(tourneysActive).then(Response => {
            this.setState({ data2: Response.data });
        });
        if (user) {
            if (user.type === "deportista") {
                axios.get(infoUserLink + user.id).then(Response => {
                    this.setState({ atleta: Response.data });
                });
            }
        }

    }

    getModes = (id) => {
        if (user !== null) {
            if (user.type === 'deportista') {
                axios.get(searchMode + id).then(Response => {
                    this.setState({ modes: Response.data });
                    this.setState({ idTorneo: id });
                });


                this.notify();

            }
            else {
                localStorage.setItem(tourneyFinish, JSON.stringify(id));
                window.location.href = "http://localhost:3000/FinishTourney";
            }
        }
        else {
            localStorage.setItem(tourneyFinish, JSON.stringify(id));
            window.location.href = "http://localhost:3000/FinishTourney";
        }

    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {
        return (
            <Fragment>
                <div><Toaster /></div>
                {this.useEffect()}
                <div id="arriba" align="right" className="divHeader">
                    {user !== null
                        ? <UserLoged />
                        : <LoginButton />

                    }

                </div>
                <div className="imagenFondo">

                
                <div align="center">
                    <img src="Logo1.png" alt="..." className="imgInicio" />
                </div>
                <div align="center">
                    <Formik

                        initialValues={
                            {
                                name: "",
                            }
                        }



                        onSubmit={(valores) => {
                            axios.get(searchAthlete + valores.name.toString())
                                .then(Response => {
                                    this.setState({ data3: Response.data });
                                    console.log(Response.data);
                                    if (Response.data[0] != null) {
                                        if (Response.data.length === 1) {
                                            localStorage.removeItem(userSearched)
                                            localStorage.setItem(userSearched, JSON.stringify(Response.data[0]))
                                            console.log("Extraño a mi amorcito")
                                            window.location.href = "http://localhost:3000/Athlete";
                                        }
                                        else {
                                            localStorage.setItem(busqueda, JSON.stringify(valores.name.toString()));
                                            window.location.href = "http://localhost:3000/AthleteList";
                                            console.log("yaiiii");
                                        }
                                    }
                                    else {
                                        errorChido = 1;
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                        }}
                    >
                        {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3 buscadorChevere" id="buscador" align="center">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Busque el nombre de un deportista"
                                        aria-label="Recipient's username"
                                        aria-describedby="button-addon2"
                                        id="searchBar"
                                        onChange={handleChange}
                                        value={values.name}
                                        onBlur={handleBlur}
                                    />

                                    <button
                                        className="btn btn-outline-secondary"
                                        type="submit"
                                        id="button-addon2">🔎</button>
                                </div>
                                {errorChido === 1
                                    ? <div className="textError" align="center">No se encontro ningun deportista</div>
                                    : null}
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="divTablas">
                                    <ul className="list-group listaInicio">
                                        <li className="list-group-item active" aria-current="true">Historial de torneos</li>
                                        {this.state.data.map(tournament => {
                                            return (
                                                <div key={tournament.id.toString()}>

                                                    <li className="list-group-item" onClick={() => { this.torneoTerminado(tournament.id) }}>{tournament.name}</li>

                                                </div>
                                            )
                                        })}
                                    </ul>
                                    <ul className="list-group listaInicio" >
                                        <li className="list-group-item active" aria-current="true">Torneos activos</li>
                                        {this.state.data2.map(tournament => {
                                            return (
                                                <li className="list-group-item"
                                                    key={tournament.id.toString()}
                                                    onClick={() => { this.getModes(tournament.id) }}
                                                >
                                                    {tournament.name}
                                                </li>
                                            )
                                        })}
                                    </ul>
                </div>
                </div>
                <ToastContainer />
            </Fragment>
        );
    }
}
