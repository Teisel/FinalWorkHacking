import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast as tostada } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cifrar, decifrar } from "./EncDec.jsx";

const User = "User.user";
const busqueda = "bus.que";
const searchAthlete = "http://localhost:8080/api/users/some/";
const activeTourney = "http://localhost:8080/api/tourneyInfo/organizerActive/";
const searchInfoTourney = "http://localhost:8080/api/tourneyInfo/categoryMode/";
const createCategory = "http://localhost:8080/api/category";
const getBands = "http://localhost:8080/api/bands";
const detectCategories = "http://localhost:8080/api/category/categoriesModify/";
const createNotifications = "http://localhost:8080/api/notification";
const userSearched = "user.searched";
const categoryu = "category.ryu";

let user = null;
let errorChido = null;
//Teisel Rivera
export class EditTourney extends Component {

    state = {
        torneo: [],
        categoriesMode: [],
        cintas: []
    }

    logOutUser = () => {
        localStorage.removeItem(User);
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

    random() {
        let random = "";
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            random += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return cifrar(random);
    }

    tostada = () => {
        tostada.success('Categoria creada correctamente', {
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
        window.location.href = "http://localhost:3000/EditTourney";
    }

    notify = () => toast((t) => (
        <div>
            <h2 className="colorPerron">¿Desea crear una categoria?</h2>
            <Formik
                initialValues={{
                    idMode: "",
                    gender: "",
                    initialAge: "",
                    finalAge: "",
                    bandStart: "Cinta",
                    bandEnd: "Cinta",
                    weightStart: "",
                    weightEnd: ""
                }}

                validate={(valores) => {
                    let errores = {};

                    if (!valores.idMode || valores.idMode === "Seleccione una modalidad") {
                        errores.idMode = "Favor de seleccionar un modalidad para la categoria"
                    }

                    if (!valores.gender) {
                        errores.gender = "Favor de seleccionar un genero para la categoria"
                    }

                    if (!valores.initialAge) {
                        errores.initialAge = "Favor de introducir la edad inicial"
                    }
                    else if (
                        (valores.initialAge < 3) ||
                        (valores.initialAge > 100)
                    ) {
                        errores.initialAge = "Edad no valida"
                    }

                    if (!valores.finalAge) {
                        errores.finalAge = "Favor de introducir la edad inicial"
                    }
                    else if (
                        (valores.finalAge < 3) ||
                        (valores.finalAge > 100) ||
                        (valores.initialAge > valores.finalAge)
                    ) {
                        errores.finalAge = "Edad no valida"
                    }

                    if (!valores.bandStart || valores.bandStart === "Cinta") {
                        errores.bandStart = "Favor de introducir la cinta inicial"
                    }

                    if (!valores.bandEnd || valores.bandEnd === "Cinta") {
                        errores.bandEnd = "Favor de introducir la cinta final"
                    }
                    else if (
                        (valores.bandEnd > valores.bandStart) ||
                        (valores.bandEnd < (valores.bandStart - 1))
                    ) {
                        errores.bandEnd = "Cinta final no valida"
                    }

                    if (
                        (valores.weightStart > 594.80) ||
                        (valores.weightStart < 25)
                    ) {
                        errores.weightStart = 'Medida no valida'
                    }

                    if (
                        (valores.weightEnd > 594.80) ||
                        (valores.weightEnd < 25) ||
                        (valores.weightEnd < valores.weightStart)
                    ) {
                        errores.weightEnd = 'Medida no valida'
                    }

                    //console.log(errores);
                    return errores;
                }}

                onSubmit={async (valores) => {
                    console.log(valores);
                    let finalValues =
                    {
                        idMode: valores.idMode,
                        gender: valores.gender,
                        ageStart: new Date(new Date().getTime() - (valores.initialAge * 365 * 24 * 60 * 60 * 1000)),
                        ageFinish: new Date(new Date().getTime() - (valores.finalAge * 365 * 24 * 60 * 60 * 1000)),
                        code: this.random(),
                        bandStart: valores.bandStart,
                        bandEnd: valores.bandEnd,
                        weightStart: valores.weightStart,
                        weightEnd: valores.weightEnd
                    }
                    axios
                        .post(createCategory, finalValues)
                        .then(Response => {
                            console.log(Response)
                            this.tostada();
                        })
                        .catch(error => { console.log(error) })

                    toast.dismiss(t.id);
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                    <form onSubmit={handleSubmit} >
                        <div align="center">
                            <select
                                className="form-select"
                                value={values.idMode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="idMode">
                                <option defaultValue>Seleccione una modalidad</option>
                                {this.state.categoriesMode.map(mode => {
                                    return (
                                        <option key={mode.id} value={mode.id}>{mode.name}</option>
                                    )
                                })}
                            </select>
                            {touched.idMode && errors.idMode && <label className="textError">{errors.idMode}</label>}

                            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value={true} onChange={handleChange} onBlur={handleBlur} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Masculino
                            </label>
                            <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value={false} onChange={handleChange} onBlur={handleBlur} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Femenino
                            </label>
                            {touched.gender && errors.gender && <label className="textError">{errors.gender}</label>}
                            <br />
                            <label className="colorPerron">Edad inicial</label>
                            <input
                                type="number"
                                name="initialAge"
                                min="3"
                                max="100"
                                step="1"
                                value={values.initialAge}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control inputEditprofile"
                            />
                            {touched.initialAge && errors.initialAge && <label className="textError">{errors.initialAge}</label>}
                            <br />
                            <label className="colorPerron">Edad final</label>
                            <input
                                type="number"
                                name="finalAge"
                                min="3"
                                max="100"
                                step="1"
                                value={values.finalAge}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control inputEditprofile"
                            />
                            {touched.finalAge && errors.finalAge && <label className="textError">{errors.finalAge}</label>}
                            <br />
                            <select
                                className="form-select"
                                value={values.bandStart}
                                name="bandStart"
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
                            {touched.bandStart && errors.bandStart && <label className="textError">{errors.bandStart}</label>}
                            <br />
                            <select
                                className="form-select"
                                value={values.bandEnd}
                                name="bandEnd"
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
                            {touched.bandEnd && errors.bandEnd && <label className="textError">{errors.bandEnd}</label>}
                            <br />
                            <input
                                type="number"
                                name="weightStart"
                                min="25"
                                max="594.80"
                                step="0.01"
                                value={values.weightStart}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control inputEditprofile"
                            />
                            {touched.weightStart && errors.weightStart && <label className="textError">{errors.weightStart}</label>}
                            <br />
                            <input
                                type="number"
                                name="weightEnd"
                                min="25"
                                max="594.80"
                                step="0.01"
                                value={values.weightEnd}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control inputEditprofile"
                            />
                            {touched.weightEnd && errors.weightEnd && <label className="textError">{errors.weightEnd}</label>}

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

    peticionGet = () => {
        axios
            .get(activeTourney + user.id)
            .then(Response => {
                //console.log(decifrar(Response.data.code));
                this.setState({ torneo: Response.data });
                axios
                    .get(searchInfoTourney + Response.data.id)
                    .then(Response => {
                        console.log(Response);
                        this.setState({ categoriesMode: Response.data })
                    })
                    .catch(error => { console.log(error) })
                this.state.torneo.code = decifrar(Response.data.code);

                axios
                    .get(detectCategories + Response.data.id)
                    .then(respons => {
                        console.log(respons.data)
                        if (respons.data.length > 0) {
                            let notificatio =
                            {
                                idUser: user.id,
                                text: "Es posible combinar categorias"
                            }
                            axios.post(createNotifications, notificatio);
                        }
                    })
                    .catch(error => { console.log(error) });
            })
            .catch(error => { console.log(error) });

        axios.get(getBands).then(Response => {
            this.setState({ cintas: Response.data });
        });

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
                    </div>
                    <div className="divEditTourney">
                        <div>
                            <Link to={"/FusionCategories"}>
                                <button className="btn btn-primary buttonEditTourney">Combinar categorias</button>
                            </Link>
                            <button
                                className="btn btn-primary buttonEditTourney"
                                onClick={() => { this.notify() }}>Crear categoria</button>
                            <Link to={"/VerifyCompetitors"}>
                                <button
                                    className="btn btn-primary">Verificar deportistas</button>
                            </Link>

                        </div>

                        <label className="textEditTourney">Nombre: {this.state.torneo.name}</label>
                        <label className="textEditTourney">Dirección: {this.state.torneo.address}</label>
                        <label className="textEditTourney">Codigo: {this.state.torneo.code}</label>

                    </div>
                    <hr size="5" />
                    <div>
                        <ul className="list-group">
                            <li className="list-group-item active" aria-current="true">Modalidades del Torneo</li>
                            {this.state.categoriesMode.map(mode => {
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
                                                                    {"Color de cinta: " + categories.color + " Edad: " + categories.initialAge + " " + categories.sex + " Code: " + decifrar(categories.code)}
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
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}