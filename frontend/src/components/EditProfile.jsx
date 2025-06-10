import { Component, Fragment } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { cifrar, decifrar } from "./EncDec.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = "User.user";
const busqueda = "bus.que";
const searchAthlete = "http://localhost:8080/api/users/some/";
const getCountries = "http://localhost:8080/api/countries";
const getBands = "http://localhost:8080/api/bands";
const infoUserLink = "http://localhost:8080/api/athleteInfo/";
const getStates = "http://localhost:8080/api/states/contryStates/";
const getAcademies = "http://localhost:8080/api/academies/stateAcademies/";
const putUser = "http://localhost:8080/api/users/";
const putAthlete = "http://localhost:8080/api/athletes/";
const createAcademy = "http://localhost:8080/api/academies";
const completeUser = "http://localhost:8080/api/usersComplete/";
const userSearched = "user.searched";

let user = null;
let errorChido = null;
//Teisel Rivera
export class EditProfile extends Component {

    state = {
        cintas: [],
        paises: [],
        atlethe: [],
        estados: [],
        academias: [],
        estadoPasado: '',
        paisPasado: '',
        images: []
    }

    getStates = idCountry => {
        axios.get(getStates + idCountry).then(Response => {
            this.setState({ estados: Response.data });
        });
    }

    getAcademies = idState => {
        axios.get(getAcademies + idState).then(Response => {
            this.setState({ academias: Response.data });
        });
    }

    cerrar() {
        axios.get(completeUser + user.id).then(Response => {
            if (Response.data.name != null) {
                localStorage.setItem(User, JSON.stringify(Response.data));
                window.location.href = "http://localhost:3000/Profile";
            }
        })
    }

    tostada = () => {
        toast.success('Información actualizada', {
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
            window.location.href = "http://localhost:3000/LogIn";
        }

    };

    peticionGet = () => {
        axios.get(getCountries).then(Response => {
            this.setState({ paises: Response.data });
        });

        axios.get(getBands).then(Response => {
            this.setState({ cintas: Response.data });
        });

        if (user.type === "deportista") {
            axios.get(infoUserLink + user.id).then(Response => {
                this.setState({ atlethe: Response.data });
            });
        }

        axios.get("imagesProfile.json").then(Response => {
            this.setState({ images: Response.data });
        });

    }

    componentDidMount() {
        this.peticionGet();
    }

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
                                            <img src="Logo1.png" className="imgLogo" aling="center" />
                                        </Link>
                                    </td>
                                    <td id="buscadorPU">
                                        <Formik

                                            initialValues={
                                                {
                                                    name: ""
                                                }
                                            }



                                            onSubmit={(valores) => {
                                                axios.get(searchAthlete + valores.name.toString())
                                                    .then(Response => {
                                                        this.setState({ data3: Response.data });
                                                        if (Response.data[0] != null) {
                                                            if (Response.data.length === 1) {
                                                                localStorage.removeItem(userSearched)
                                                                localStorage.setItem(userSearched, JSON.stringify(Response.data[0]))
                                                                window.location.href = "http://localhost:3000/Athlete";
                                                            }
                                                            else {
                                                                localStorage.setItem(busqueda, JSON.stringify(valores.name.toString()));
                                                                window.location.href = "http://localhost:3000/AthleteList";
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
                    <div
                        id="perro"
                    >
                        <Formik
                            initialValues={
                                {
                                    name: '',
                                    password: '',
                                    height: '',
                                    weight: '',
                                    band: '',
                                    academy: 'Escuela',
                                    nameAcademy: '',
                                    country: 'Pais',
                                    state: 'Estado',
                                    directionAcademy: '',
                                    pastPassword: ''
                                }
                            }

                            validate={(values) => {
                                let errors = {};

                                if (!values.name) {
                                    errors.name = 'Ingrese un nombre';
                                }

                                if (!values.pastPassword) {
                                    errors.pastPassword = 'Ingrese la contraseña anterior';
                                }
                                else if (decifrar(user.password) !== values.pastPassword) {
                                    errors.pastPassword = 'Ingrese la contraseña anterior';
                                }


                                if (!values.password) {
                                    errors.password = 'Ingrese una contraseña';
                                }
                                else if (values.pastPassword === values.password) {
                                    errors.password = 'Ingrese una nueva contraseña';
                                }

                                if (values.height > 2.30 && user.type === 'deportista') {
                                    errors.height = 'Medida no valida'
                                }
                                if (values.height < 0.61 && user.type === 'deportista') {
                                    errors.height = 'Medida no valida'
                                }

                                if (values.weight > 594.80 && user.type === 'deportista') {
                                    errors.weight = 'Medida no valida'
                                }
                                if (values.weight < 25 && user.type === 'deportista') {
                                    errors.weight = 'Medida no valida'
                                }

                                if ((values.band === 'Cinta') && (user.type !== 'organizador')) {
                                    errors.band = 'Seleccione una cinta';
                                }

                                if (values.country === 'Pais') {
                                    errors.country = 'Seleccione un pais'
                                }
                                if (values.state === 'Estado') {
                                    errors.state = 'Seleccione un estado';
                                }

                                if (values.academy === 'Escuela' && user.type === 'deportista') {
                                    errors.academy = 'Seleccione una escuela'
                                }
                                if (!values.nameAcademy && user.type === 'organizador' && values.academy === 'Escuela') {
                                    errors.nameAcademy = 'Ingrese el nombre de la nueva escuela'
                                }

                                if (!values.directionAcademy && user.type === 'organizador' && values.academy === 'Escuela') {
                                    errors.directionAcademy = 'Ingrese la dirección de la academia'
                                }

                                //onsole.log(errors);
                                return errors;
                            }}

                            onSubmit={(values) => {
                                let image = document.querySelector('.carousel-item.active img').getAttribute('src');

                                let finalValues = {
                                    idAcademy: values.academy,
                                    name: values.name,
                                    bornDate: user.birthDate,
                                    gender: user.gender,
                                    pic: image,
                                    email: user.email,
                                    password: cifrar(values.password)
                                }

                                if (user.type === 'deportista') {

                                    let athleteS = {
                                        weight: values.weight,
                                        high: values.height,
                                        idColor: values.band
                                    }

                                    axios.put(putUser + user.id, finalValues)
                                        .then(response => {
                                            console.log(response)
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        });

                                    axios.put(putAthlete + user.id, athleteS)
                                        .then(response => {
                                            console.log(response)
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    this.tostada();
                                }
                                else if (values.academy === 'Escuela') {
                                    let academyValues = {
                                        name: values.nameAcademy,
                                        direction: values.directionAcademy,
                                        idState: values.state
                                    }
                                    axios
                                        .post(createAcademy, academyValues)
                                        .then(response => {
                                            finalValues.idAcademy = response.data.id
                                            console.log(finalValues);
                                            axios
                                                .put(putUser + user.id, finalValues)
                                                .then(response => {
                                                    console.log(response)
                                                })
                                                .catch(error => {
                                                    console.log(error)
                                                })
                                            console.log(response)
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    this.tostada();
                                }
                                else {
                                    axios
                                        .put(putUser + user.id, finalValues)
                                        .then(response => {
                                            console.log(response)
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                    this.tostada();
                                }

                            }}
                        >
                            {({ values, handleBlur, handleChange, handleSubmit, errors, touched }) => (
                                <form onSubmit={handleSubmit}>
                                    <div aria-describedby="perro">
                                        <div className="divElLog">


                                            <div id="carouselExampleIndicators" className="carousel slide imgUser" data-bs-ride="carousel" data-bs-interval="false">
                                                <div className="carousel-inner">
                                                    {
                                                        this.state.images.map(image => {
                                                            return (
                                                                <Fragment key={image.id}>
                                                                    {image.id === 0
                                                                        ? <div className="carousel-item active">
                                                                            <img src={image.src} className="d-block w-100" alt="Logo2.png" />
                                                                        </div>
                                                                        :
                                                                        <div className="carousel-item">
                                                                            <img src={image.src} className="d-block w-100" alt="Logo2.png" />
                                                                        </div>
                                                                    }
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <label className="textLogin">Nombre de usuario</label>
                                            <input
                                                type="text"
                                                name="name"
                                                maxLength="100"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-describedby="perro"
                                                className="form-control"
                                                id="inputNameSignIn" />
                                            {touched.name && errors.name && <label className="textError">{errors.name}</label>}
                                        </div>

                                        <div className="divElLog">
                                            <label className="textLogin">Contraseña anterior</label>
                                            <input
                                                type="password"
                                                name="pastPassword"
                                                maxLength="100"
                                                value={values.pastPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="form-control inputEditprofile"
                                            />
                                            {touched.pastPassword && errors.pastPassword && <label className="textError">{errors.pastPassword}</label>}
                                        </div>

                                        <div className="divElLog">
                                            <label className="textLogin">Contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                maxLength="100"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="form-control"
                                                id="inputPasswordLogIn" />
                                            {touched.password && errors.password && <label className="textError">{errors.password}</label>}
                                        </div>

                                        <div className="divElLog">
                                            {user.type === 'deportista'
                                                ? <Fragment>
                                                    <div className="divEditProfile">
                                                        <label className="textLogin"
                                                            aria-describedby="inputNumber">Estatura:</label>
                                                        <input
                                                            type="number"
                                                            name="height"
                                                            min="0.61"
                                                            max="2.30"
                                                            step="0.01"
                                                            value={values.height}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className="form-control"
                                                            id="inputNumber" />
                                                        {touched.height && errors.height && <label className="textError">{errors.height}</label>}
                                                    </div>
                                                    <br />
                                                    <div className="divEditProfile">
                                                        <label className="textLogin"
                                                            aria-describedby="inputNumberb">Peso:</label>
                                                        <input
                                                            type="number"
                                                            name="weight"
                                                            min="25"
                                                            max="594.80"
                                                            step="0.01"
                                                            value={values.weight}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            className="form-control"
                                                            id="inputNumberb" />
                                                    </div>
                                                    {touched.weight && errors.weight && <label className="textError">{errors.weight}</label>}
                                                    <br />
                                                    <div>
                                                        <label className="textLogin">Cinta</label>
                                                        <select
                                                            className="form-select"
                                                            value={values.band}
                                                            name="band"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        >
                                                            <option defaultValue>Cinta</option>
                                                            {this.state.cintas.map(band => {
                                                                if (this.state.atlethe.idColor >= band.id) {
                                                                    return (
                                                                        <option className="list-group-item" key={band.id.toString()} value={band.id}>{band.color}</option>
                                                                    )
                                                                }

                                                            })}
                                                        </select>
                                                        {touched.band && errors.band && <label className="textError">{errors.band}</label>}
                                                    </div>
                                                    <br />
                                                </Fragment>
                                                : null}
                                            <div>
                                                <label className="textLogin">Nacionalidad</label>
                                                <select
                                                    className="form-select"
                                                    value={values.country}
                                                    name="country"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option defaultValue>Pais</option>
                                                    {this.state.paises.map(country => {
                                                        return (
                                                            <option className="list-group-item" key={country.id.toString()} value={country.id}>{country.name}</option>
                                                        )
                                                    })}
                                                </select>
                                                {touched.country && errors.country && <label className="textError">{errors.country}</label>}
                                            </div >
                                            {values.country === 'Pais'
                                                ? null
                                                : <Fragment>
                                                    {this.state.paisPasado !== values.country
                                                        ? this.getStates(values.country)
                                                        : null
                                                    }
                                                    <div className="ocultardiv">
                                                        {this.state.paisPasado = values.country}
                                                    </div>

                                                    <div>
                                                        <label className="textLogin">Estado</label>

                                                        <select
                                                            className="form-select"
                                                            value={values.state}
                                                            name="state"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        >
                                                            <option defaultValue>Estado</option>
                                                            {this.state.estados.map(state => {
                                                                return (
                                                                    <option className="list-group-item" key={state.id.toString()} value={state.id}>{state.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        {touched.state && errors.state && <label className="textError">{errors.state}</label>}
                                                    </div>
                                                    {values.state === 'Estado'
                                                        ? null
                                                        : <Fragment>
                                                            {this.state.estadoPasado !== values.state
                                                                ? this.getAcademies(values.state)
                                                                : null
                                                            }
                                                            <div className="ocultardiv">
                                                                {this.state.estadoPasado = values.state}
                                                            </div>
                                                            <div >
                                                                <label className="textLogin">Escuela</label>
                                                                <select className="form-select"
                                                                    value={values.academy}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    name="academy"
                                                                >

                                                                    <option defaultValue>Escuela</option>


                                                                    {this.state.academias.map(academy => {
                                                                        return (
                                                                            <option className="list-group-item" key={academy.id.toString()} value={academy.id}>{academy.name}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                                {touched.academy && errors.academy && <label className="textError">{errors.academy}</label>}
                                                            </div>
                                                            <br />
                                                            {values.academy === 'Escuela' && user.type === 'organizador'
                                                                ? <Fragment>
                                                                    <div >
                                                                        <input
                                                                            type="text"
                                                                            name="nameAcademy"
                                                                            placeholder="Nueva escuela"
                                                                            value={values.nameAcademy}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            className="form-control"
                                                                            maxLength="20"
                                                                            id="inputNameAcademySignIn" />
                                                                        {touched.nameAcademy && errors.nameAcademy && <label className="textError">{errors.nameAcademy}</label>}
                                                                    </div>
                                                                    <br />
                                                                    <div>
                                                                        <input
                                                                            type="text"
                                                                            name="directionAcademy"
                                                                            placeholder="Dirección de la nueva escuela"
                                                                            value={values.directionAcademy}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            maxLength="100"
                                                                            className="form-control"
                                                                            id="inputDirectionAcademySignIn" />
                                                                        {touched.directionAcademy && errors.directionAcademy && <label className="textError">{errors.directionAcademy}</label>}
                                                                    </div>
                                                                </Fragment>
                                                                : null}
                                                        </Fragment>
                                                    }

                                                </Fragment>
                                            }
                                            <br />
                                            <button type="submit" className="btn btn-primary">Aceptar</button>
                                        </div>

                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}