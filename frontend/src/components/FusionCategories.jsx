import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast as tostada } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cifrar } from "./EncDec.jsx";


const User = "User.user";
const searchAthlete = "http://localhost:8080/api/users/some/";
const activeTourney = "http://localhost:8080/api/tourneyInfo/organizerActive/";
const detectCategories = "http://localhost:8080/api/category/categoriesModify/";
const createCategory = "http://localhost:8080/api/category";
const busqueda = "bus.que";
const userSearched = "user.searched";

let user = null;
let errorChido = null;
//Teisel Rivera
export class FusionCategories extends Component {

    state = {
        torneo: [],
        categoriesMode: []
    }

    random() {
        let random = "";
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            random += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return cifrar(random);
    }

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    tostada = () => {
        tostada.success('Categorias combinadas correctamente', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            onClose: this.refresh
        });
    }

    refresh() {
        window.location.href = "http://localhost:3000/FusionCategories"
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        if (userSesion) {
            user = userSesion;
        }
        else {
            user = null;
            window.location.href = "http://localhost:3000/LogIn";
        }

    };

    peticionGet = () => {
        axios
            .get(activeTourney + user.id)
            .then(Response => {
                //console.log(Response);
                this.setState({ torneo: Response.data });
                /*axios
                    .get(searchInfoTourney + Response.data.id)
                    .then(Response => {
                        console.log(Response);
                        this.setState({ categoriesMode: Response.data })
                    })
                    .catch(error => { console.log(error) })*/
                axios
                    .get(detectCategories + Response.data.id)
                    .then(Response => {
                        console.log(Response)
                        this.setState({ categoriesMode: Response.data })
                    })
                    .catch(error => { console.log(error) });
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
                <div><Toaster toastOptions={
                    {
                        duration: Infinity
                    }
                } /></div>
                <div id="divContenedorPerfil">
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
                        <div>
                            <ul className="list-group">
                                <li className="list-group-item active" aria-current="true">Categorias que se pueden combinar</li>
                                {this.state.categoriesMode.map(category => {
                                    return (
                                        <li className="list-group-item categoriasCabios" key={category.category.id}>{category.category.bandStart + "-" + category.category.bandEnd + " " + category.category.ageFinish + "-" + category.category.ageStart + " " + category.category.initialWeight + "-" + category.category.finalWeight}
                                            <button className="btn btn-primary" onClick={() => {
                                                toast((t) => (
                                                    <div>
                                                        <h2 className="colorPerron">¿Seguro que desea combinar las categorias?</h2>
                                                        <br />
                                                        <h5 className="colorPerron">{category.category.bandStart + "-" + category.category.bandEnd + " " + category.category.ageFinish + "-" + category.category.ageStart + " " + category.category.initialWeight + "-" + category.category.finalWeight}</h5>
                                                        <br />
                                                        <h5 className="colorPerron"> {category.categoryChange.bandStart + "-" + category.categoryChange.bandEnd + " " + category.categoryChange.ageFinish + "-" + category.categoryChange.ageStart + " " + category.categoryChange.initialWeight + "-" + category.categoryChange.finalWeight}</h5>
                                                        <div className="divInscri">
                                                            <button className="btn btn-danger" type="button" id="botonCancelarInscri" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                                                            <button className="btn btn-primary" onClick={() => {
                                                                let fechaInicio = new Date();
                                                                let fechaFin = new Date();
                                                                let cintaInicial = 0;
                                                                let cintaFinal = 0;
                                                                let pesoInicial = 0.00;
                                                                let pesoFinal = 0.00;
                                                                //Fecha de inicio
                                                                if (category.category.initialAge >= category.categoryChange.initialAge) {
                                                                    fechaInicio = category.category.initialAge
                                                                }
                                                                else {
                                                                    fechaInicio = category.categoryChange.initialAge;
                                                                }
                                                                //Fecha Fin
                                                                if (category.category.finalAge <= category.categoryChange.finalAge) {
                                                                    fechaFin = category.category.finalAge
                                                                }
                                                                else {
                                                                    fechaFin = category.categoryChange.finalAge;
                                                                }
                                                                //Cinta inicial
                                                                if (category.category.idBandStart >= category.categoryChange.idBandStart) {
                                                                    cintaInicial = category.category.idBandStart
                                                                }
                                                                else {
                                                                    cintaInicial = category.categoryChange.idBandStart;
                                                                }
                                                                //Cinta final
                                                                if (category.category.idBandEnd <= category.categoryChange.idBandEnd) {
                                                                    cintaFinal = category.category.idBandEnd
                                                                }
                                                                else {
                                                                    cintaFinal = category.categoryChange.idBandEnd;
                                                                }
                                                                //Peso inicial
                                                                if (category.category.initialWeight <= category.categoryChange.initialWeight) {
                                                                    pesoInicial = category.category.initialWeight
                                                                }
                                                                else {
                                                                    pesoInicial = category.categoryChange.initialWeight;
                                                                }
                                                                //Peso final
                                                                if (category.category.finalWeight >= category.categoryChange.finalWeight) {
                                                                    pesoFinal = category.category.finalWeight
                                                                }
                                                                else {
                                                                    pesoFinal = category.categoryChange.finalWeight;
                                                                }
                                                                //console.log(fechaFin);
                                                                let newCategory = {
                                                                    idMode: category.category.idMode,
                                                                    gender: category.category.sexBool,
                                                                    ageStart: fechaInicio,
                                                                    ageFinish: fechaFin,
                                                                    code: this.random(),
                                                                    bandStart: cintaInicial,
                                                                    bandEnd: cintaFinal,
                                                                    weightStart: pesoInicial,
                                                                    weightEnd: pesoFinal
                                                                }
                                                                console.log(newCategory)
                                                                axios
                                                                    .post(createCategory, newCategory)
                                                                    .then(res => {
                                                                        console.log(res);
                                                                        axios
                                                                            .delete(createCategory + "/" + category.category.id + "/" + category.categoryChange.id + "/" + res.data.id)
                                                                            .then(respuesta => {
                                                                                console.log(respuesta);
                                                                            })
                                                                            .catch(error => { console.log(error) })
                                                                        toast.dismiss(t.id);
                                                                        this.tostada();
                                                                    })
                                                                    .catch(error => { console.log(error) })
                                                            }}>Ok</button>
                                                        </div>
                                                    </div>
                                                ))
                                            }}>Combinar</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}