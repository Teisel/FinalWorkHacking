import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";

const User = "User.user";
const busqueda = "bus.que";
const userSearched = "user.searched";
const searchAthlete = "http://localhost:8080/api/users/some/";
const tags = "http://localhost:8080/api/tags/";
const infoUserLink = "http://localhost:8080/api/athleteInfo/";
const historyTourney = "http://localhost:8080/api/tourneyInfo/userHistory/";
const tourneyFinish = "tourney.finish";

let user = null;
let errorChido = null;
let searchedUser = null;

//Teisel Rivera
export class Athlete extends Component {

    state =
        {
            tags: [],
            deportista: [],
            torneos: []
        }

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    torneoTerminado = (id) => {
        localStorage.setItem(tourneyFinish, JSON.stringify(id));
        window.location.href = "http://localhost:3000/FinishTourney";
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        const uS = JSON.parse(localStorage.getItem(userSearched));

        if (userSesion) {
            user = userSesion;
        }
        else {
            user = null;
        }

        if (uS) {
            searchedUser = uS;
        }
        else {
            searchedUser = null;
            window.location.href = "http://localhost:3000/";
        }

    };

    peticionGet = () => {
        axios
            .get(tags + searchedUser.id)
            .then(response => {
                let trueTags = {
                    dP: "",
                    fouls: "",
                    noFouls: "",
                    top3: "",
                    winner: ""
                }
                console.log(response.data);
                if (response.data.dP) {
                    trueTags.dP = "Este deportista a ganado por una gran diferencia de puntos Diferencia de puntos"
                }

                if (response.data.fouls) {
                    trueTags.fouls = "Este deportista hace muchas faltas Fouls"
                }

                if (response.data.noFouls) {
                    trueTags.noFouls = "Este deportista no hace faltas Respetuoso"
                }

                if (response.data.top3) {
                    trueTags.top3 = "Este deportista quedo entre los tres mejores ultimamente Top 3"
                }

                if (response.data.winner) {
                    trueTags.winner = "Este deportista gano el torneo en el que participo Ganador"
                }

                this.setState({ tags: trueTags });
            })
            .catch(error => { console.log(error) })

        axios
            .get(infoUserLink + searchedUser.id)
            .then(Response => {
                this.setState({ deportista: Response.data });
            })
            .catch(error => { console.log(error) });

        axios
            .get(historyTourney + searchedUser.id)
            .then(Response => {
                //console.log(Response.data);
                this.setState({ torneos: Response.data })
            })
            .catch(error => { console.log(error) });
    }

    componentDidMount() {
        this.peticionGet();
    }


    render() {
        return (
            <Fragment>
                {this.useEffect()}
                <div id="divContenedorPerfil">
                    <div aling="center">
                        <table id="headerPerfil" >
                            <tbody>
                                <tr>
                                    <td id="contenedorLogoPerfil">
                                        <Link to="/">
                                            <img src="Logo1.png" className="imgLogo" aling="center" alt="Sex2.png" />
                                        </Link>
                                    </td>
                                    <td id="buscadorPU">
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
                                                    <div className="input-group mb-3" id="buscador" align="center">
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
                                    </td>
                                    <td id="bottonSalirPerfil" aling="center">
                                        <Link to="/LogIn">
                                            <button className="btn btn-danger"
                                                onClick={() => { this.logOutUser() }}
                                            >
                                                Cerrar sesión
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                        <hr size="5" />
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="contenedorImgUsuarioPerfil">
                                            <img src={searchedUser.pic} className="imgUsuarioPerfil" alt="Fotos/Logo2.png" />
                                        </td>
                                        <td>
                                            <div>
                                                <div>
                                                    <label className="textPerfil">{searchedUser.name}</label>
                                                    <label className="textPerfil">{this.state.deportista.weight}</label>
                                                </div>
                                                <label className="textPerfil">{searchedUser.gender
                                                    ? "Masculino"
                                                    : "Femenino"}</label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr size="5" />
                        <div className="divTags">

                            <div className="divTagsTags">
                                {this.state.tags.dP
                                    ? <label className="botonTags chidoTags" title={this.state.tags.dP.substring(0, 58)}>{this.state.tags.dP.substring(59, this.state.tags.dP.length)}</label>
                                    : null}
                                {this.state.tags.fouls
                                    ? <label className="botonTags peligroTags " title={this.state.tags.fouls.substring(0, 34)} >{this.state.tags.fouls.substring(35, this.state.tags.fouls.length)}</label>
                                    : null}
                                {this.state.tags.noFouls
                                    ? <label className="botonTags chidoTags " title={this.state.tags.noFouls.substring(0, 30)} >{this.state.tags.noFouls.substring(30, this.state.tags.noFouls.length)}</label>
                                    : null}
                                {this.state.tags.top3
                                    ? <label className="botonTags chidoTags " title={this.state.tags.top3.substring(0, 57)} >{this.state.tags.top3.substring(57, this.state.tags.top3.length)}</label>
                                    : null}
                                {this.state.tags.winner
                                    ? <label className="botonTags chidoTags " title={this.state.tags.winner.substring(0, 50)} >{this.state.tags.winner.substring(50, this.state.tags.winner.length)}</label>
                                    : null}
                            </div>

                            <div className="historialTags">
                                <ul className="list-group">
                                    <li className="list-group-item active" aria-current="true">Historial</li>
                                    {this.state.torneos.map(tournament => {
                                        return (
                                            <li className="list-group-item" key={tournament.id.toString()} onClick={() => { this.torneoTerminado(tournament.id) }}>{tournament.name}</li>
                                        )
                                    })}
                                </ul>
                            </div>


                        </div>
                    </div>
                </div>
            </Fragment>)
    }
}