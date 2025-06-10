import { Fragment } from "react";
import { Component } from "react/cjs/react.production.min";
import axios from "axios";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { cifrar } from "./EncDec.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

const getCountries = "http://localhost:8080/api/countries";
const getStates = "http://localhost:8080/api/states/contryStates/";
const getAcademies = "http://localhost:8080/api/academies/stateAcademies/";
const getBands = "http://localhost:8080/api/bands";
const verify = "http://localhost:8080/api/users/verify/";
const create = "http://localhost:8080/api/users";
const creatAthlete = "http://localhost:8080/api/athletes";
const createAcademy = "http://localhost:8080/api/academies";
const createTags = "http://localhost:8080/api/tags";
const actualDate = new Date(new Date().getTime() - (3 * 365 * 24 * 60 * 60 * 1000));
const legalDate = new Date(new Date().getTime() - (18 * 365 * 24 * 60 * 60 * 1000));
const User = "User.user";
//Teisel Rivera
export class SingIn extends Component {

    state = {
        paises: [],
        estados: [],
        academias: [],
        cintas: [],
        fecha: new Date(),
        estadoPasado: '',
        paisPasado: '',
        posibleUsuario: [],
        a: false,
        disable: false
    }

    onChange = fecha => {
        this.setState({ fecha: fecha })
    }

    setDisable()
    {
        this.setState({disable: true});
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

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        if (userSesion) {
            window.location.href = "http://localhost:3000/";
        }
    };

    peticionGet = () => {
        axios.get(getCountries).then(Response => {
            this.setState({ paises: Response.data });
        });

        axios.get(getBands).then(Response => {
            this.setState({ cintas: Response.data });
        });

    }

    componentDidMount() {
        this.peticionGet();
    }

    tostada = () => {
        toast.success('Usuario creado correctamente', {
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

    cerrar() {
        window.location.href = "http://localhost:3000/LogIn"
    }

    render() {
        return (
            <Fragment>
                {this.useEffect()}
                <div id="contenedorLogIn">
                    <div className="divElLog">
                        <label className="textLogin">Registrarse</label>
                    </div>
                    <div className="divElLog">
                        <hr size="5" />
                    </div>
                    <Formik
                        initialValues={
                            {
                                email: '',
                                name: '',
                                password: '',
                                height: '',
                                weight: '',
                                type: 'Tipo de usuario',
                                band: 'Cinta',
                                academy: 'Escuela',
                                nameAcademy: '',
                                country: 'Pais',
                                state: 'Estado',
                                sex: 'Sexo',
                                directionAcademy: '',
                                emailDaddyMommy: ''
                            }
                        }
                        validate={(valores) => {
                            let errores = {};
                            if (valores.type === 'Tipo de usuario') {
                                errores.type = 'Favor de elegir un tipo de usuario';
                            }

                            if (!valores.email) {
                                errores.email = 'Ingrese un correo';

                            }
                            else if (true) {

                                axios.get(verify + valores.email).then(Response => {
                                    if (Response.data.name != null) {
                                        this.setState({ posibleUsuario: Response.data });
                                        this.setState({ a: true });
                                    }
                                    else {
                                        this.setState({ posibleUsuario: null });
                                    }
                                })
                                if (this.state.a === true) {
                                    errores.email = 'Correo ya utilizado';
                                    this.setState({ a: false });
                                }

                            }


                            if (!valores.name) {
                                errores.name = 'Ingrese un nombre';
                            }
                            
                            if (!valores.password) {
                                errores.password = 'Ingrese una contraseña';
                            }

                            if (this.state.fecha > actualDate) {
                                errores.fecha = 'Fecha no valida';
                            }
                            if (!valores.emailDaddyMommy && valores.type === 'deportista' && this.state.fecha > legalDate) {
                                errores.emailDaddyMommy = 'Ingrese el correo de tu tutor'
                            }

                            else if (valores.email === valores.emailDaddyMommy) {
                                errores.emailDaddyMommy = 'Ingrse el correo de su tutor';
                            }

                            if (valores.height > 2.30 && valores.type === 'deportista') {
                                errores.height = 'Medida no valida'
                            }
                            if (valores.height < 0.61 && valores.type === 'deportista') {
                                errores.height = 'Medida no valida'
                            }

                            if (valores.weight > 594.80 && valores.type === 'deportista') {
                                errores.weight = 'Medida no valida'
                            }
                            if (valores.weight < 25 && valores.type === 'deportista') {
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
                            if (!valores.nameAcademy && valores.type === 'organizador' && valores.academy === 'Escuela') {
                                errores.nameAcademy = 'Ingrese el nombre de la nueva escuela'
                            }

                            if (valores.sex === 'Sexo') {
                                errores.sex = 'Ingrese su sexo biologico';
                            }

                            if (!valores.directionAcademy && valores.type === 'organizador' && valores.academy === 'Escuela') {
                                errores.directionAcademy = 'Ingrese la dirección de la academia'
                            }


                            console.log(errores);
                            return errores;
                        }}

                        onSubmit={async (valores) => {
                            this.setDisable();
                            valores.fecha = this.state.fecha;
                            let finalValues = await {
                                idAcademy: valores.academy,
                                name: valores.name,
                                bornDate: valores.fecha,
                                gender: valores.sex,
                                email: valores.email,
                                password: cifrar(valores.password),
                                typeUser: valores.type,
                                pic: "Fotos/Logo2.png"
                            }



                            if (finalValues.typeUser === 'deportista') {
                                if (valores.emailDaddyMommy) {
                                    finalValues.email = valores.emailDaddyMommy;
                                }
                                axios
                                    .post(create, finalValues)
                                    .then(response => {
                                        console.log(response)
                                        axios
                                            .get(verify + finalValues.email)
                                            .then(Response => {

                                                let athleteValues = {
                                                    id: Response.data.id,
                                                    weight: valores.weight,
                                                    high: valores.height,
                                                    idColor: valores.band
                                                }

                                                let tags = {
                                                    id: Response.data.id,
                                                    dP: false,
                                                    fouls: false,
                                                    winner: false,
                                                    top3: false,
                                                    noFouls: false
                                                }
                                                console.log(tags);
                                                axios
                                                    .post(creatAthlete, athleteValues)
                                                    .then(response => {
                                                        console.log(response)

                                                        axios
                                                            .post(createTags, tags)
                                                            .then(response => {
                                                                console.log(response.data)
                                                                this.tostada();
                                                            })
                                                            .catch(error => { console.log(error) })

                                                    })
                                                    .catch(error => {
                                                        console.log(error)
                                                    })
                                            })
                                            .catch(error => { console.log(error) })


                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            }
                            else if (valores.academy === 'Escuela') {
                                let academyValues = {
                                    name: valores.nameAcademy,
                                    direction: valores.directionAcademy,
                                    idState: valores.state
                                }
                                axios
                                    .post(createAcademy, academyValues)
                                    .then(response => {
                                        finalValues.idAcademy = response.data.id
                                        axios
                                            .post(create, finalValues)
                                            .then(response => {
                                                console.log(response)
                                                this.tostada();
                                            })
                                            .catch(error => {
                                                console.log(error)
                                            })
                                        console.log(response)

                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })

                            }
                            else {
                                axios
                                    .post(create, finalValues)
                                    .then(response => {
                                        console.log(response)
                                        this.tostada();
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            }
                        }}
                    >
                        {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                            <form onSubmit={handleSubmit}>

                                <div className="divElLog">
                                    <select
                                        id="selectRegi"
                                        className="form-select"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="type">
                                        <option defaultValue>Tipo de usuario</option>
                                        <option value={'deportista'}>Deportista</option>
                                        <option value={'organizador'}>Organizador</option>
                                    </select>
                                    {touched.type && errors.type && <label className="textError">{errors.type}</label>}
                                </div>

                                <div className="divElLog">
                                    <label className="textLogin">Correo electronico</label>
                                    <input
                                        type="text"
                                        name="email"
                                        maxLength="100"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        id="inputEmailLogin" />
                                    {touched.email && errors.email && <label className="textError">{errors.email}</label>}
                                </div>
                                <div className="divElLog">
                                    <label className="textLogin">Nombre de usuario</label>
                                    <input
                                        type="text"
                                        name="name"
                                        maxLength="100"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="form-control"
                                        id="inputNameSignIn" />
                                    {touched.name && errors.name && <label className="textError">{errors.name}</label>}
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
                                    <label className="textLogin">Fecha de nacimiento</label>
                                    <DatePicker
                                        selected={this.state.fecha}
                                        onChange={this.onChange}
                                        onBlur={handleBlur}
                                        name="fecha" />
                                    {errors.fecha && <label className="textError">{errors.fecha}</label>}
                                </div>
                                {this.state.fecha > legalDate
                                    ?
                                    <Fragment>
                                        <div className="divElLog">
                                            <input
                                                type="text"
                                                name="emailDaddyMommy"
                                                placeholder="Correo de el tutor"
                                                value={values.emailDaddyMommy}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="form-control"
                                                maxLength="100"
                                                id="inputEmailDaddyMommy" />
                                            {touched.emailDaddyMommy && errors.emailDaddyMommy && <label className="textError">{errors.emailDaddyMommy}</label>}
                                        </div>
                                    </Fragment>
                                    : null
                                }
                                <div className="divElLog">
                                    <div className="divSignIn">
                                        <label className="textLogin">Sexo</label>
                                        {values.type === 'deportista'
                                            ? <Fragment>
                                                <label className="textLogin">Estatura</label>
                                                <label className="textLogin">Peso</label>
                                            </Fragment>
                                            : null}
                                    </div>
                                    <div className="divSignIn">
                                        <select
                                            id="selectRegi2"
                                            className="form-select"
                                            value={values.sex}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="sex"
                                        >
                                            <option defaultValue>Sexo</option>
                                            <option value={'true'}>Masculino</option>
                                            <option value={'false'}>Femenino</option>
                                        </select>
                                        {touched.sex && errors.sex && <label className="textError">{errors.sex}</label>}
                                        {values.type === 'deportista'
                                            ? <Fragment><input
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
                                                {touched.weight && errors.weight && <label className="textError">{errors.weight}</label>}</Fragment>
                                            : null}

                                    </div>
                                </div>
                                {values.type === 'deportista'
                                    ? <Fragment>
                                        <div className="divElLog">
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
                                                    return (
                                                        <option className="list-group-item" key={band.id.toString()} value={band.id}>{band.color}</option>
                                                    )
                                                })}
                                            </select>
                                            {touched.band && errors.band && <label className="textError">{errors.band}</label>}
                                        </div>
                                    </Fragment>
                                    : null}

                                <div className="divElLog">
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
                                </div>
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

                                        <div className="divElLog">
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
                                                <div className="divElLog">
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


                                <div className="divElLog">
                                    <button type="submit" className="btn btn-primary" disabled = {this.state.disable}>Registrarse</button>
                                </div>
                            </form>
                        )}

                    </Formik>
                </div>
                <ToastContainer />
            </Fragment>
        );
    }
}