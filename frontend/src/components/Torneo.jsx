import { Fragment } from "react";
import axios from "axios";
import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import { Formik } from "formik";

const User = "User.user";
const busqueda = "bus.que";
const tourneyFinish = "tourney.finish";
const searchAthlete = "http://localhost:8080/api/users/some/";
const searchTourney = "http://localhost:8080/api/tourneyInfo/";
const searchInfoTourney = "http://localhost:8080/api/tourneyInfo/categoryMode/";
const userSearched = "user.searched";
const categoryu = "category.ryu";

let user = null;
let id = null;
let errorChido = null;

export class Tourney extends Component {

    state = {
        tourney: [],
        infoTourney: []
    }

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        const idT = JSON.parse(localStorage.getItem(tourneyFinish));
        //let urlNow = window.location.pathname;
        //let s = urlNow.lastIndexOf('/') + 1;
        //id = urlNow.substring(s, urlNow.length);
        //console.log(id);
        if (userSesion) {
            user = userSesion;
        }
        if (idT) {
            id = idT;
        }
    };

    peticionGet = () => {
        axios.get(searchTourney + id).then(Response => {
            this.setState({ tourney: Response.data });
            //console.log(this.state.tourney.name);
        });

        axios.get(searchInfoTourney + id)
            .then(Response => {
                this.setState({ infoTourney: Response.data })
            })

    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {


        return (
            <Fragment>
                {this.useEffect()}
                {!this.state.tourney.name
                    ?
                    <Fragment>
                        <div>
                            <h1>Error 404 not found</h1>
                        </div>
                    </Fragment>

                    :
                    <Fragment>

                        <div align="center" id="divContenedorPerfil">
                            <table id="headerPerfil" >
                                <tbody>
                                    <tr>
                                        <td id="contenedorLogoPerfil">
                                            <Link to="/">
                                                <img src="Logo1.png" className="imgLogo" aling="center" alt="Logo2.png" />
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

                                            {user !== null
                                                ?
                                                <Link to="/LogIn">
                                                    <button className="btn btn-danger"
                                                        onClick={() => { this.logOutUser() }}
                                                    >
                                                        Cerrar sesión
                                                    </button>
                                                </Link>
                                                :


                                                <Link to="/LogIn">
                                                    <button className="btn btn-primary">
                                                        Iniciar sesión
                                                    </button>
                                                </Link>
                                            }

                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                            <hr size="5" />
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h1>{this.state.tourney.name}</h1>
                                        </td>
                                        <td>
                                            <h2>{this.state.tourney.country}</h2>
                                            <h2>{this.state.tourney.address}</h2>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr size="5" />
                            <ul className="list-group">
                                <li className="list-group-item active" aria-current="true">Modalidades del Torneo</li>
                                {this.state.infoTourney.map(mode => {
                                    return (
                                        <Fragment key={mode.id.toString()}>
                                            <div className="accordion-item" >
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + mode.id} aria-expanded="true" aria-controls={"collapse" + mode.id}>
                                                        {mode.name}
                                                    </button>
                                                </h2>

                                                {mode.categories.map(
                                                    categories => {
                                                        return (
                                                            <Fragment key={categories.id.toString()}>
                                                                <div id={"collapse" + mode.id} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" 
                                                                onClick={() => {
                                                                    localStorage.removeItem(categoryu)
                                                                    localStorage.setItem(categoryu, JSON.stringify(categories.id))
                                                                    window.location.href = "http://localhost:3000/Category";
                                                                }}>
                                                                    <div className="accordion-body" >
                                                                        {"Color de cinta: " + categories.color + " Edad: " + categories.initialAge + " " + categories.sex}
                                                                    </div>
                                                                </div>
                                                            </Fragment>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </Fragment>
                                    )
                                })}
                            </ul>
                        </div>


                    </Fragment>
                }
            </Fragment>
        )

    }
}
