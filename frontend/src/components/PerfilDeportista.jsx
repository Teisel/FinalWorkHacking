import { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast as tostada } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from "formik";

const historyTourney = "http://localhost:8080/api/tourneyInfo/userHistory/";
const activeTourney = "http://localhost:8080/api/tourneyInfo/userActive/";
const inscriptionTourney = "http://localhost:8080/api/tourneyInfo/userInscriptions/";
const competitorsLink = "http://localhost:8080/api/competitor";
const infoUserLink = "http://localhost:8080/api/athleteInfo/";
const searchMode = "http://localhost:8080/api/category/";
const User = "User.user";
const tourneyFinish = "tourney.finish";

let user = null;

//Teisel Rivera
export class PerfilDeportista extends Component {
    state = {
        data: [],
        data2: [],
        data3: [],
        atleta: [],
        modes: [],
        idTorneo: []
    }

    peticionGet = () => {
        axios
            .get(historyTourney + user.id)
            .then(Response => {
                this.setState({ data: Response.data });
            });
        console.log(activeTourney + user.id);

        axios
            .get(activeTourney + user.id)
            .then(Response => {
                this.setState({ data2: Response.data });
            });

        axios
            .get(inscriptionTourney + user.id)
            .then(Response => {
                this.setState({ data3: Response.data });
            });

        axios
            .get(infoUserLink + user.id)
            .then(Response => {
                this.setState({ atleta: Response.data });
            });

    }

    componentDidMount() {
        this.peticionGet();
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

    torneoTerminado = (id) => {
        localStorage.setItem(tourneyFinish, JSON.stringify(id));
        window.location.href = "http://localhost:3000/FinishTourney";
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

    getModes = (id) => {


        axios.get(searchMode + id).then(Response => {
            this.setState({ modes: Response.data });
            this.setState({ idTorneo: id });
            this.notify();
        });

    }


    render() {
        return (
            <Fragment>
                <div><Toaster /></div>
                {this.useEffect()}
                <div>
                    <div align="center">
                        <Link to="/Video">
                            <button type="button" className="btn btn-primary" id="botonPractica">Practica</button>
                        </Link>
                        <Link to={"/EditProfile"}>
                            <button type="button" className="btn btn-primary" id="botonEditarPerfilUsuario">Editar perfil</button>
                        </Link>
                    </div>
                    <hr size="5" />
                    <table>
                        <tbody>
                            <tr>
                                <td id="historial">
                                    <ul className="list-group">
                                        <li className="list-group-item active" aria-current="true">Historial</li>
                                        {this.state.data.map(tournament => {
                                            return (
                                                <li className="list-group-item" key={tournament.id.toString()} onClick={() => { this.torneoTerminado(tournament.id) }}>{tournament.name}</li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td id="activos">
                                    <ul className="list-group">
                                        <li className="list-group-item active" aria-current="true">Torneos activos</li>
                                        {this.state.data2.map(tournament => {
                                            return (
                                                <li className="list-group-item"
                                                    key={tournament.id.toString()}
                                                    onClick={() => { this.getModes(tournament.id) }}>{tournament.name}</li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td id="inscrito">
                                    <ul className="list-group">
                                        <li className="list-group-item active" aria-current="true">Torneos inscritos</li>
                                        {this.state.data3.map(tournament => {
                                            return (
                                                <li className="list-group-item" key={tournament.id.toString()} onClick={() => { this.torneoTerminado(tournament.id) }}>{tournament.name}</li>
                                            )
                                        })}
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}