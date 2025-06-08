import { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast as tostada } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import { cifrar } from "./EncDec.jsx";

const historyTourney = "http://localhost:8080/api/tourneyInfo/historyOrganizer/";
const activeTourney = "http://localhost:8080/api/tourneyInfo/organizerActive/";
const newTourney = "http://localhost:8080/api/tourneyInfo";
const newMode = "http://localhost:8080/api/modeDTO";
const actualDate = new Date(new Date().getTime());
const legalDate = new Date(new Date().getTime() + (1 * 365 * 24 * 60 * 60 * 1000));
const tourneyFinish = "tourney.finish";

const User = "User.user";
let user = null;
//Teisel Rivera
export class PerfilOrganizador extends Component {
    state = {
        data: [],
        data2: [],
        data3: [],
        aTourney: [],
        fechaInicio: new Date(),
        fechaFin: new Date()
    }

    random()
    {
        let random = "";
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for(let i = 0; i < 5; i++)
        {
            random += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return random;
    }

    torneoTerminado = (id) => {
        localStorage.setItem(tourneyFinish, JSON.stringify(id));
        window.location.href = "http://localhost:3000/FinishTourney";
    }

    peticionGet = () => {
        axios.get(historyTourney + user.id).then(Response => {
            this.setState({ data: Response.data });
        });

        axios.get(activeTourney + user.id).then(Response => {
            this.setState({ aTourney: Response.data });
        });

    }
    onChange = fecha => {
        this.setState({ fechaInicio: fecha })
    }

    onChangeFin = fecha => {
        this.setState({ fechaFin: fecha })
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

    tostada = () => {
        tostada.success('Torneo creado correctamente', {
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
            <h2 className="colorPerron">¿Desea crear un torneo?</h2>
            <Formik
                initialValues={{
                    name: '',
                    direction: '',
                    type: 'Tipo de torneo',
                    areas: '',
                    Combate: false,
                    Formas:false
                }}

                validate={(valores) => {
                    let errores = {};
                    //Checar que la fecha de inicio se iguial o mayor a la actual y que no pase de un año
                    if
                    (
                       this.state.fechaInicio <= actualDate ||
                        this.state.fechaInicio > legalDate
                    )
                    {
                        errores.fechaInicio = 'Fecha no valida'
                    }

                    if 
                    (
                        this.state.fechaFin < this.state.fechaInicio ||
                        this.state.fechaFin > (this.state.fechaInicio.getTime() + (7 * 24 * 60 * 60 * 1000)) 
                    )
                    {
                        errores.fechaFin = 'Fecha no valida'
                    }
                    
                    //Lo tipico del nombre

                    if (!valores.name) {
                        errores.name = 'Ingrese un nombre';
                    }
                    else if (!/^[a-zA-ZÀ-ÿ0-9\s]{1,100}$/.test(valores.name)) {
                        errores.name = 'Nombre invalido';
                    }
                    //Lo tipico de los tipos

                    if (valores.type === 'Tipo de torneo') {
                        errores.type = 'Favor de elegir un tipo de torneo';
                    }
                    //Numero no menor a cero y nop mayor de 50
                    if 
                    (
                        valores.areas > 50 ||
                        valores.areas < 1
                    ) 
                    {
                        errores.areas = 'Cantidad no valida'
                    }

                    if (!valores.direction) {
                        errores.direction = 'Ingrese la dirección del torneo'
                    }

                    if (!valores.Combate && !valores.Formas)
                    {
                        errores.modes = 'Seleccione al menos una modalidad para el torneo'
                    }
                    
                    //console.log(errores);
                    return errores;
                }}

                onSubmit={async (valores) => {
                    console.log(valores)
                    let codigo = cifrar(this.random());
                    let finalValues = {
                        idUser: user.id,
                        dateStart: this.state.fechaInicio,
                        dateFinish: this.state.fechaFin,
                        name: valores.name,
                        address: valores.direction,
                        status: true,
                        type: valores.type,
                        areas: valores.areas,
                        code: codigo
                    }

                    axios
                    .post(newTourney, finalValues)
                    .then(Response => {
                        console.log(Response)
                        if (valores.Combate)
                        {
                            let modeValiues = {
                                idTourney: Response.data.id,
                                idMode: 1
                            }

                            axios
                            .post(newMode, modeValiues)
                            .then(Response => {console.log(Response)})
                            .catch(error => {console.log(error)})
                        }
                        if (valores.Formas)
                        {
                            let modeValiues = {
                                idTourney: Response.data.id,
                                idMode: 2
                            }

                            axios
                            .post(newMode, modeValiues)
                            .then(Response => {console.log(Response)})
                            .catch(error => {console.log(error)})
                        }
                        this.tostada();
                        window.location.href = "http://localhost:3000/Profile";
                    })
                    .catch(error => {console.log(error)})

                    toast.dismiss(t.id);
                    
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                    <form onSubmit={handleSubmit} >
                        <div align="center">
                            <select
                                className="form-select"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="type">
                                <option defaultValue>Tipo de torneo</option>
                                <option value={false}>Abierto</option>
                                <option value={true}>Selectivo</option>
                            </select>
                            {touched.type && errors.type && <label className="textError">{errors.type}</label>}
                            <label className="colorPerron">Modalidades del torneo</label>
                            <br/>
                            <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value={values.Formas} 
                            id="Formas"
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            name="Formas"/>
                            <label className="form-check-label" htmlFor="Formas">
                                Formas
                            </label>
                          
                            <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value={values.Combate}
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            id="Combate"
                            name="Combate"/>
                            <label className="form-check-label" htmlFor="Combate">
                                Combate
                            </label>
                            <br/>
                            {errors.modes && <label className="textError">{errors.modes}</label>}
                            <label className="colorPerron">Fecha de inicio</label>
                            <DatePicker
                                selected={this.state.fechaInicio}
                                onChange={this.onChange}
                                onBlur={handleBlur}
                                name="fechaInicio" />
                            {errors.fechaInicio && 
                            <div>
                                <label className="textError">{errors.fechaInicio}</label>
                                <br/>
                            </div>}
                            <label className="colorPerron">Fecha de fin</label>
                            <DatePicker
                                selected={this.state.fechaFin}
                                onChange={this.onChangeFin}
                                onBlur={handleBlur}
                                name="fechaFin" />
                            {errors.fechaFin && 
                            <div>
                                <label className="textError">{errors.fechaFin}</label>
                                <br/>
                            </div>}
                            <label className="colorPerron">Nombre del torneo</label>
                            <input
                                type="text"
                                name="name"
                                maxLength="100"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control"
                            />
                            {touched.name && errors.name &&
                            <div>
                            <label className="textError">{errors.name}</label>
                            <br/>
                        </div>}
                            <label className="colorPerron">Dirección del torneo</label>
                            <input
                                type="text"
                                name="direction"
                                maxLength="100"
                                value={values.direction}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control"
                            />
                            {touched.direction && errors.direction && <label className="textError">{errors.direction}</label>}
                            <label className="colorPerron">Cantidad de areas del torneo</label>
                            <input
                                type="number"
                                name="areas"
                                min="1"
                                max="50"
                                step="1"
                                value={values.areas}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control"
                            />
                            {touched.areas && errors.areas && <label className="textError">{errors.areas}</label>}
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
                <div>
                    <div align="center">
                        {this.state.aTourney.id === 0
                            ? <button
                                type="button"
                                className="btn btn-primary"
                                id="crearTorneo"
                                onClick={() => { this.notify() }}>Crear Torneo</button>

                            : <Link to="/EditTourney">
                                <button type="button" className="btn btn-primary" id="crearTorneo">Administrar Torneo</button>
                            </Link>
                        }
                        {console.log(this.state.aTourney)}
                        <Link to={"/HelpTourney"}>
                            <button type="button" className="btn btn-primary" id="botonAyudarOrganizador">Ayudar</button>
                        </Link>
                        <Link to={"/EditProfile"}>
                            <button type="button" className="btn btn-primary" id="botonEditarPerfilUsuarioOrganizador">Editar perfil</button>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}