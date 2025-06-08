import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import { decifrar, cifrar } from "./EncDec.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = "User.user";
const busqueda = "bus.que";
const userSearched = "user.searched";
const searchAthlete = "http://localhost:8080/api/users/some/";
const getAllTourneys = "http://localhost:8080/api/tourneyInfo";
const getAllCategories = "http://localhost:8080/api/tourneyInfo/completeCategories/";
const categoryHelp = "category.help";

let user = null;
let errorChido = null;
let searchedUser = null;

//Teisel Rivera
export class HelpTourney extends Component {

    state = {
        disable: false
    }

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    tostada = () => {
        toast.success('Iniciando categoria', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            onClose: this.cerrar
        });
    }

    tostadaEvil = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    cerrar()
    {
        window.location.href = "http://localhost:3000/InitializedCategory";
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));

        if (userSesion) {
            user = userSesion;
        }
        else {
            user = null;
            window.location.href = "http://localhost:3000/";
        }

        if (user.type === "deportista")
        {
            window.location.href = "http://localhost:3000/";
        }
    };

    peticionGet = () => {
        
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
                        <div className="divHelp">
                            <Formik
                                initialValues={{
                                    tourneyCode: "",
                                    categoryCode: ""
                                }}

                                validate={(valores) => {
                                    let errroresPerrones = {};
                                    if (!valores.tourneyCode) {
                                        errroresPerrones.tourneyCode = "Ingrese el codigo del torneo"
                                    }

                                    if (!valores.categoryCode) {
                                        errroresPerrones.categoryCode = "Ingrese el codigo de la categoria"
                                    }
                                    return errroresPerrones;
                                }}

                                onSubmit={(valores) => {
                                    this.setState({disable: true});
                                    console.log(valores);
                                    axios
                                        .get(getAllTourneys)
                                        .then(response => {
                                            let t = [];
                                            let c = [];
                                            for (let i = 0; i < response.data.length; i++) {
                                                if (decifrar(response.data[i].code) === valores.tourneyCode) {
                                                    t = response.data[i]
                                                }
                                            }
                                            if (t.address) {
                                                axios
                                                    .get(getAllCategories + t.id)
                                                    .then(respons => {
                                                        for (let i = 0; i < respons.data.length; i++) {
                                                            if (decifrar(respons.data[i].code) === valores.categoryCode) {
                                                                c = respons.data[i];
                                                                console.log(c);
                                                            }
                                                        }
                                                        if (c.id)
                                                        {
                                                            if(!c.end && !c.state)
                                                            {
                                                                localStorage.setItem(categoryHelp, JSON.stringify(c))
                                                                this.tostada()
                                                            }
                                                            else{
                                                                this.tostadaEvil("Categoria activa en otro dispositivo, o ya finalizada")
                                                                this.setState({disable: false});
                                                            }
                                                            
                                                        }
                                                        else
                                                        {
                                                            this.tostadaEvil('Codiogo o codigos incorrectos')
                                                            this.setState({disable: false});
                                                        }
                                                    })
                                            }
                                            else{
                                                this.tostadaEvil('Codiogo o codigos incorrectos')
                                                this.setState({disable: false});
                                            }

                                        })


                                }}
                            >
                                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                                    <form onSubmit={handleSubmit}>
                                        <label className="textLogin">Codigo del torneo</label>
                                        <input
                                            type="text"
                                            name="tourneyCode"
                                            value={values.tourneyCode}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength="5"
                                            className="form-control inputHelp"
                                        />

                                        {touched.tourneyCode && errors.tourneyCode && <label className="textError">{errors.tourneyCode}</label>}
                                        <br />
                                        <label className="textLogin">Codigo de la categoria</label>
                                        <input
                                            type="text"
                                            name="categoryCode"
                                            value={values.categoryCode}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength="5"
                                            className="form-control inputHelp"
                                        />
                                        {touched.categoryCode && errors.categoryCode && <label className="textError">{errors.categoryCode}</label>}
                                        <br />
                                        <button type="submit" className="btn btn-primary" disabled = {this.state.disable}>Aceptar</button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </Fragment>)
    }
}