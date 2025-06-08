import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";

const User = "User.user";
const busqueda = "bus.que";
const searchAthlete = "http://localhost:8080/api/users/some/";
const userSearched = "user.searched";

let user = null;
let buscador = null;
let errorChido = null;
//Teisel Rivera
export class DeportistaList extends Component {

    state = {
        deportistas: []
    }

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        const search = JSON.parse(localStorage.getItem(busqueda));
        if (userSesion) {
            user = userSesion;
        }
        else {
            user = null;
        }
        if (search) {
            buscador = search;
        }
        else {
            buscador = null;
            //window.location.href="http://localhost:3000/";
        }

    };

    peticionGet = () => {
        console.log(buscador);
        axios
            .get(searchAthlete + buscador)
            .then(Response => {
                console.log(Response);
                this.setState({ deportistas: Response.data })
            })
            .catch(error => { console.log(error) })
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
                        <ul className="list-group">
                            <li className="list-group-item active" aria-current="true">Deportistas</li>

                            {this.state.deportistas.map(deportista => {
                                return (
                                    <Link to={"/Athlete"} key={deportista.id.toString()} onClick={e => {
                                        localStorage.removeItem(userSearched)
                                        localStorage.setItem(userSearched, JSON.stringify(deportista))
                                    }
                                    }>
                                        <li className="list-group-item" >{deportista.name}</li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </Fragment>)
    }
}