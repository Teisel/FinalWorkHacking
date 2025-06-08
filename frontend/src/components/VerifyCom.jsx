import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast as tostada } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const User = "User.user";
const busqueda = "bus.que";
const searchAthlete = "http://localhost:8080/api/users/some/";
const searchAthleteEmail = "http://localhost:8080/api/users/verify/";
const updateAthlte = "http://localhost:8080/api/athletes";
const getCompetitors = "http://localhost:8080/api/competitor/tourneyCompetitors/"
const userSearched = "user.searched";
const activeTourney = "http://localhost:8080/api/tourneyInfo/organizerActive/";
const getBands = "http://localhost:8080/api/bands";
const searchInfoTourney = "http://localhost:8080/api/category/allCompleteCategories/";
const actualDate = new Date(new Date().getTime() - (3 * 365 * 24 * 60 * 60 * 1000));
const getCountries = "http://localhost:8080/api/countries";
const getStates = "http://localhost:8080/api/states/contryStates/";
const getAcademies = "http://localhost:8080/api/academies/stateAcademies/";
const create = "http://localhost:8080/api/users";
const creatAthlete = "http://localhost:8080/api/athletes";
const createCompetitor = "http://localhost:8080/api/competitor";

let errorChido = null;
let user = null;
let formularioPerron = null;


//Teisel Rivera
export class VerifyCom extends Component {

    state = {
        disable: false,
        torneo: [],
        cintas: [],
        categoriesMode: [],
        fecha: new Date(),
        paises: [],
        estados: [],
        academias: []
    }

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    onChange = fecha => {
        this.setState({ fecha: fecha })
    }

    tostadaA = (variablePerrona, tipo) => {
        if (tipo === 1) {
            tostada.error(variablePerrona, {
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
        else {
            tostada.success(variablePerrona, {
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
                //console.log(decifrar(Response.data.code));
                axios
                    .get(searchInfoTourney + Response.data.id)
                    .then(Response => {
                        //console.log(Response);
                        this.setState({ categoriesMode: Response.data })
                    })
                    .catch(error => { console.log(error) })
                this.setState({ torneo: Response.data });
            })

        axios.get(getBands).then(Response => {
            this.setState({ cintas: Response.data });
        });

        axios.get(getCountries).then(Response => {
            this.setState({ paises: Response.data });
        });
    }

    componentDidMount() {
        this.peticionGet();
    }

    async updateWeight(valores) {
        //Se busca el deportista con el nombre
        await axios.get(searchAthleteEmail + valores.email)
            .then(response => {
                //Si lo encuentra, entonces procede a tomar los datos del deportista
                if (response.data.id) {
                    //Busca los datos del deportista
                    axios.get(updateAthlte + "/" + response.data.id)
                        .then(respons => {
                            //Busca los datos del competidor
                            axios.get(getCompetitors + this.state.torneo.id)
                                .then(respo => {
                                    let wah = respo.data.find(competitor => competitor.idUser === response.data.id);
                                    if (wah.id && wah.verify === false) {
                                        wah.verify = true;
                                        let updatedAthlete = respons.data;
                                        updatedAthlete.weight = valores.weight;
                                        console.log(wah);
                                        console.log(updatedAthlete);

                                        axios.put(updateAthlte + "/" + respons.data.id, updatedAthlete)
                                            .then(respuesta => {

                                                //Aqui se verifica que no se tenga que cambiar de categoria
                                                axios.get(updateAthlte + "/verifyAthlete/" + updatedAthlete.id + "/" + wah.idCategory + "/" + wah.id + "/" + this.state.torneo.id)
                                                    .then(respues => {
                                                        if (respues.status === 200) {
                                                            axios.put("http://localhost:8080/api/competitor/" + wah.id, wah)
                                                        }

                                                        this.tostadaA('El usuario fue verificado correctamente', 0)

                                                    })
                                                    .catch(err => {
                                                        console.log(err.Error);
                                                        this.tostadaA('A ocurrido un error, no se a verificado el usuario', 1)

                                                    });


                                            })
                                    }
                                    else {
                                        this.tostadaA('El usuario ya fue verificado', 1);
                                    }
                                })
                        })
                        .catch(error => {
                            this.tostadaA("No se encontro al deportista", 1);
                        })
                }
                else {
                    this.tostadaA("El usuario no esta inscrito en el torneo", 1);
                }
            })
            .catch(error => {
                this.tostadaA("No se encontro al deportista", 1);
            })

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

    notify = () => toast((t) => (
        <div>
            <h2 className="colorPerron">¿Desea inscribir un deportista anonimo?</h2>
            <Formik
                initialValues={{
                    cat: "Seleccione la categoria",
                    band: "Cinta",
                    name: "",
                    weight: "",
                    high: "",
                    academy: 'Escuela',
                    country: 'Pais',
                    state: 'Estado',
                    sex: ""
                }}

                validate={(valores) => {
                    let errores = {};

                    if (valores.cat === "Seleccione la categoria") {
                        errores.cat = "Seleccione una categoria";
                    }
                    else {
                        let categoria = this.state.categoriesMode.find(category => category.id === Number(valores.cat));
                        if (
                            (valores.sex !== (categoria.sexBool + "")) ||
                            (categoria.idBandStart < Number(valores.band)) ||
                            (categoria.idBandEnd > Number(valores.band)) ||
                            (categoria.initialWeight > Number(valores.weight)) ||
                            (categoria.finalWeight < Number(valores.weight)) ||
                            (this.state.fecha > Date.parse(categoria.initialAge)) ||
                            (this.state.fecha < Date.parse(categoria.finalAge))
                        ) {
                            errores.cat = "Categoria inconpatible"
                        }
                    }

                    if (!valores.name) {
                        errores.name = 'Ingrese un nombre';
                    }
                    else if (!/^[a-zA-ZÀ-ÿ\s]{1,100}$/.test(valores.name)) {
                        errores.name = 'Nombre invalido';
                    }

                    if (this.state.fecha > actualDate) {
                        errores.fecha = 'Fecha no valida';
                    }

                    if (!valores.high) {
                        errores.high = 'Medida no valida'
                    }
                    if (valores.high > 2.30) {
                        errores.high = 'Medida no valida'
                    }
                    if (valores.high < 0.61) {
                        errores.high = 'Medida no valida'
                    }

                    if (!valores.weight) {
                        errores.weight = 'Medida no valida'
                    }
                    if (valores.weight > 594.80) {
                        errores.weight = 'Medida no valida'
                    }
                    if (valores.weight < 25) {
                        errores.weight = 'Medida no valida'
                    }

                    if ((valores.band === 'Cinta') && (valores.type !== 'organizador')) {
                        errores.band = 'Seleccione una cinta';
                    }

                    if (valores.country === 'Pais') {
                        errores.country = 'Seleccione un pais'
                    }
                    if (valores.state === 'Estado') {
                        errores.state = 'Seleccione un estado';
                    }

                    if (valores.academy === 'Escuela' && valores.type === 'deportista') {
                        errores.academy = 'Seleccione una escuela'
                    }


                    if (valores.sex === '') {
                        errores.sex = 'Ingrese su sexo biologico';
                    }



                    return errores;
                }}

                onSubmit={async (valores) => {
                    console.log(valores);

                    valores.fecha = this.state.fecha;

                    let finalValues = {
                        idAcademy: valores.academy,
                        name: valores.name,
                        bornDate: valores.fecha,
                        gender: valores.sex,
                        email: "",
                        password: "",
                        typeUser: "anonimo",
                        pic: ""
                    }

                    axios
                        .post(create, finalValues)
                        .then(response => {
                            //console.log(response)
                            let athleteValues = {
                                id: response.data.id,
                                weight: valores.weight,
                                high: valores.high,
                                idColor: valores.band
                            }

                            let participante = 
                            {
                                idUser: response.data.id,
                                idCategory: valores.cat,
                                place: 0,
                                verify: true
                            }
                            axios
                                .post(creatAthlete, athleteValues)
                                .then(response => {
                                    console.log(response)

                                    axios
                                        .post(createCompetitor, participante)
                                        .then(response => {
                                            //console.log(response.data)
                                            this.tostadaA('El usuario anonimo fue creado y verificado correctamente', 0)
                                        })
                                        .catch(error => { 
                                            console.log(error) 
                                            this.tostadaA('A ocurrido un error', 1)
                                        })

                                })
                                .catch(error => {
                                    console.log(error)
                                })



                        })
                        .catch(error => {
                            console.log(error)
                        })

                    toast.dismiss(t.id);
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                    <form onSubmit={handleSubmit} >
                        <div align="center">
                            <select
                                className="form-select"
                                value={values.cat}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="cat">
                                <option defaultValue>Seleccione la categoria</option>
                                {this.state.categoriesMode.map(category => {
                                    return (
                                        <option key={category.id} value={category.id}>{category.mode.substring(0, 2)} {category.sex.substring(0, 1)} {category.bandStart}-{category.bandEnd} {category.initialWeight}-{category.finalWeight} {category.ageStart}-{category.ageFinish}</option>
                                    )
                                })}
                            </select>
                            {touched.cat && errors.cat && <label className="textError">{errors.cat}</label>}
                            <br />
                            <label className="colorPerron">Datos del deportista</label>
                            <br />
                            <input className="form-check-input" type="radio" name="sex" id="flexRadioDefault1" value={true} onChange={handleChange} onBlur={handleBlur} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Masculino
                            </label>
                            <input className="form-check-input" type="radio" name="sex" id="flexRadioDefault1" value={false} onChange={handleChange} onBlur={handleBlur} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Femenino
                            </label>
                            {touched.sex && errors.sex && <label className="textError">{errors.sex}</label>}
                            <br />
                            <br />
                            <label className="colorPerron">Fecha de nacimiento</label>
                            <DatePicker
                                selected={this.state.fecha}
                                onChange={this.onChange}
                                onBlur={handleBlur}
                                name="fecha" />
                            {errors.fecha && <label className="textError">{errors.fecha}</label>}
                            <br />
                            <br />
                            <select
                                className="form-select"
                                value={values.band}
                                name="band"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option defaultValue>Cinta</option>
                                {this.state.cintas.map(band => {
                                    return (
                                        <option className="list-group-item" key={band.id.toString()} value={band.id}>{band.color}</option>
                                    )
                                })}
                            </select>
                            {touched.band && errors.band && <label className="textError">{errors.band}</label>}
                            <br />
                            <label className="colorPerron">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control inputEditprofile"
                            />
                            {touched.name && errors.name && <label className="textError">{errors.name}</label>}
                            <br />
                            <label className="colorPerron">Peso</label>
                            <input
                                type="number"
                                name="weight"
                                min="25"
                                max="594.80"
                                step="0.01"
                                value={values.weight}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control inputEditprofile"
                            />
                            {touched.weight && errors.weight && <label className="textError">{errors.weight}</label>}
                            <br />
                            <label className="colorPerron">Altura</label>
                            <input
                                type="number"
                                name="high"
                                min="0.61"
                                max="2.3"
                                step="0.01"
                                value={values.high}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control inputEditprofile"
                            />
                            {touched.high && errors.high && <label className="textError">{errors.high}</label>}
                            <br />
                            <label className="colorPerron">Nacionalidad</label>
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
                                        <option className="list-group-item" key={country.id} value={country.id}>{country.name}</option>
                                    )
                                })}
                            </select>
                            {touched.country && errors.country && <label className="textError">{errors.country}</label>}
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


                                    <label className="colorPerron">Estado</label>

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
                                            <label className="colorPerron">Escuela</label>
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
                                            {values.academy === 'Escuela' && values.type === 'organizador'
                                                ? <Fragment>
                                                    <div className="divElLog">
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
                                                    <div className="divElLog">
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

                        </div>
                        <div className="divInscri">
                            <button className="btn btn-danger" type="button" id="botonCancelarInscri" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                            <button type="submit" className="btn btn-primary">Ok</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    ));


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
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                email: "",
                                weight: ""
                            }}

                            validate={(valores) => {
                                let errores = {};
                                if (!valores.email) {
                                    errores.email = 'Ingrese un correo';

                                }
                                else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                                    errores.email = 'Correo invalido';
                                }

                                if (!valores.weight) {
                                    errores.weight = 'Ingrese una cantidad'
                                }

                                if (valores.weight > 594.80 && valores.type === 'deportista') {
                                    errores.weight = 'Medida no valida'
                                }
                                if (valores.weight < 25 && valores.type === 'deportista') {
                                    errores.weight = 'Medida no valida'
                                }

                                return errores;
                            }}

                            onSubmit={(valores) => {
                                this.updateWeight(valores);
                            }}
                        >
                            {({ values, handleSubmit, handleChange, handleBlur, errors, touched, handleReset }) => (
                                <form onSubmit={handleSubmit} id="FormularioPerron">
                                    <label className="textLogin">Correo electronico</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control inputHelp"
                                    />

                                    {touched.email && errors.email && <label className="textError">{errors.email}</label>}
                                    <br />

                                    <label className="textLogin">Peso del deportista</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={values.weight}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        min="25"
                                        max="594.80"
                                        step="0.01"
                                        className="form-control inputHelp"
                                    />
                                    {touched.weight && errors.weight && <label className="textError">{errors.weight}</label>}
                                    <br />
                                    <div className="divEditTourney">
                                        <button type="button" className="btn btn-primary" onClick={() => {
                                            this.notify();
                                        }}>Participante anonimo</button>
                                        <button type="submit" className="btn btn-primary" disabled={this.state.disable}>Aceptar</button>
                                        <button type="button" className="btn btn-primary" onClick={handleReset}>Limpiar datos</button>
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