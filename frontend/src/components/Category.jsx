import { Component, Fragment } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";

const User = "User.user";
const searchAthlete = "http://localhost:8080/api/users/some/";
const getCompetitors = "http://localhost:8080/api/completeCom/";
const getResults = "http://localhost:8080/api/result";
const busqueda = "bus.que";
const userSearched = "user.searched";
const categoryu = "category.ryu";

let errorChido = null;
let user = null;
let cat = null;

export class Category extends Component {

    state = {
        competitors: [],
        results: []
    }

    logOutUser = () => {
        localStorage.removeItem(User);
    }


    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        const category = JSON.parse(localStorage.getItem(categoryu));

        if (userSesion) {
            user = userSesion;
        }
        else {
            user = null;
        }

        if (category) {
            cat = category;
        }
        else {
            cat = null;
            window.location.href = "http://localhost:3000/";
        }

    };

    peticionGet = () => {
        //Busca los deportistas que participan
        axios
            .get(getCompetitors + cat)
            .then(Response => {
                console.log(Response.data);
                this.setState({ competitors: Response.data });
            })
            .catch(error => { console.log(error) })

        axios
            .get(getResults + "/getCompleteResults/" + cat)
            .then(Response => {
                this.setState({ results: Response.data })
            })
            .catch(error => { console.log(error) })
    }

    funcionPerrona = () => {
        if (this.state.results.length === 0) {
            return null;
        }

        let n = 0;
        let numeroPerron = 0;
        console.log(this.state.results)
        for (let i = 0; numeroPerron < this.state.results.length; i++) {
            numeroPerron = (2 ** i) - 1;
            n = i;
            console.log(numeroPerron + " " + n)
        }
        let inicio = 2 ** (n - 1);
        let bonito = 0;
        let posts = [];
        let postsPerrones = [];
        for (let j = 0; j < n; j++) {
            posts.push(<div key={j} className="divWah">
                {(() => {
                    for (let i = 0; i < inicio; i++) {
                        let comA = "";
                        let comB = "";
                        //Ina es el resultado que se obtine del arreglo de resultados con el numero bonito
                        //let Ina = this.state.results[bonito];
                        if (this.state.results[bonito].resultAthletes.length === 2) {
                            comA = this.state.competitors.find(competitor => competitor.id === this.state.results[bonito].resultAthletes[0].idCompetitor);
                            comB = this.state.competitors.find(competitor => competitor.id === this.state.results[bonito].resultAthletes[1].idCompetitor);

                            console.log(comA);
                        }
                        postsPerrones.push(<Fragment key={"" + j + "-" + i}>
                            {this.state.results[bonito].resultAthletes.length === 2
                                ? <div>
                                    <button className="btn btn-info" disabled={true}> {comA.name} <br /> VS <br /> {comB.name}</button>
                                </div>
                                : <button className="btn btn-info">Aun estan compitiendo</button>
                            }

                            <br />
                        </Fragment>
                        )
                        bonito++;
                    }
                })()}
                {postsPerrones}
            </div>)
            postsPerrones = []
            inicio = inicio / 2
        }

        return posts;
    }

    ganador = () => {
        let win = "";
        let winner = "";
        win = this.state.results.find(result => result.result.nextRes === 0)
        console.log(win)
        if (win !== undefined) {
            if (win.result.winner !== 0) {
                winner = this.state.competitors.find(competitor => competitor.id === win.result.winner);
                return <div className="divWah"><button className="btn btn-info" disabled={true}>Ganador: <br/> {winner.name}</button></div>
            }
        }

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
                    <div className="divCat">
                        <div className="divCompetitors">
                            <ul className="list-group">
                                <li className="list-group-item active" aria-current="true">Participantes</li>
                                {this.state.competitors.map(competitor => {
                                    if (competitor.name.indexOf(" ") !== -1) {
                                        return (
                                            <li className="list-group-item" key={competitor.id.toString()}>{competitor.name.substring(0, competitor.name.indexOf(" "))}</li>
                                        )
                                    }
                                    else {
                                        return (
                                            <li className="list-group-item" key={competitor.id.toString()}>{competitor.name}</li>
                                        )
                                    }

                                })}
                            </ul>
                        </div>

                        <div className="divGraph">
                            {this.funcionPerrona()}
                            {this.ganador()}
                        </div>
                    </div>
                </div>
            </Fragment>
        )

    }
}