import { Component, Fragment } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";

const User = "User.user";
const TypeVid = "Type.vid";
const searchAthlete = "http://localhost:8080/api/users/some/";
const busqueda = "bus.que";
const userSearched = "user.searched";

let errorChido = null;
let user = null;
let typeVideo = "a";
//Teisle Rivera
export class Video extends Component {

    logOutUser = () => {
        localStorage.removeItem(User);
        localStorage.removeItem(TypeVid);
    }

    setTypevideo = (type) => {
        typeVideo = type
        localStorage.setItem(TypeVid, JSON.stringify(typeVideo));
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        localStorage.setItem(TypeVid, JSON.stringify(typeVideo));

        if (userSesion) {
            user = userSesion;
        }
        else {
            user = null;
            window.location.href = "http://localhost:3000/LogIn";
        }

        if (user.type !== 'deportista') {
            window.location.href = "http://localhost:3000/";
        }

    };

    render() {
        return (
            <Fragment>
                {this.useEffect()}
                <div>
                    <div aling="center">
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
                    </div>
                </div>
                <div className="divVideo">
                    <Link to="/VideoSelect">
                        <button className="btn btn-primary" type="button" id="botonVideoPractica"
                            onClick={() => { this.setTypevideo("f") }}
                        >Formas</button>
                    </Link>
                    <Link to="/VideoSelect">
                        <button className="btn btn-primary" type="button" id="botonVideoPractica"
                            onClick={() => { this.setTypevideo("c") }}
                        >Combate</button>
                    </Link>
                </div>
            </Fragment>
        )

    }
}