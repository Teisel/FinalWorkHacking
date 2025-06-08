import { Component } from "react/cjs/react.development";
import { Fragment } from "react/cjs/react.production.min";
import axios from "axios";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import ReactPlayer from "react-player";
//import VideoPlayer from "react-video-js-player";
//import TaegukIlYang from "./Videos/Formas/Taegeuk_il_Jang_primer_forma.mp4"; 

//const videoSrc = TaegukIlYang;
const searchAthlete = "http://localhost:8080/api/users/some/";
const infoUserLink = "http://localhost:8080/api/athleteInfo/";
const busqueda = "bus.que";
const User = "User.user";
const TypeVid = "Type.vid";
const userSearched = "user.searched";

let listVideo = null;
let mainVideo = null;
let title = null;

let typeVideo = "a";
let user = null;
let errorChido = null;
//Teisel Rivera
export class VideoSelect extends Component {
    state = {
        data: [],
        atlethe: []
    }

    logOutUser = () => {
        localStorage.removeItem(User);
    }


    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));

        const typeVideoA = JSON.parse(localStorage.getItem(TypeVid));

        if (userSesion) {
            user = userSesion;
        }
        else {
            user = null;
            window.location.href = "http://localhost:3000/LogIn";
        }

        if (typeVideoA) {
            typeVideo = typeVideoA;
        }
        else {
            window.location.href = "http://localhost:3000/LogIn";
        }

    };

    tostada = (tipo) => {
        console.log(tipo);
        if (tipo === true) {
            toast.success('Conexión restablecida', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                toastId: 1
            });
        }
        else {
            toast.error('Conexión perdida', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                toastId: 2
            });
        }



    }

    isOnline() {
        if (navigator.onLine) {
            this.tostada(true);
        }
        else {
            this.tostada(false);
        }
    }

    peticionGet = () => {

        if (typeVideo === "c") {
            axios.get("videosCombate.json").then(Response => {
                this.setState({ data: Response.data });
            });
        }
        if (typeVideo === "f") {
            axios.get("videosFormas.json").then(Response => {
                this.setState({ data: Response.data });
            });
        }


        axios.get(infoUserLink + user.id).then(Response => {
            this.setState({ atlethe: Response.data });
        });
    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {

        return (
            <Fragment>
                {window.addEventListener("online", (e) => this.isOnline())}
                {window.addEventListener("offline", (e) => this.isOnline())}
                {this.useEffect()}
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
                <div className="divReproductor" aling="center">
                    <div className="main-video">
                        <div className="video">
                            <video muted controls autoPlay></video>
                            <h2 className="title"></h2>
                        </div>
                    </div>
                    <div className="video-list">
                        {this.state.data.map(video => {
                            if (this.state.atlethe.idColor <= video.level) {
                                return (
                                    <div
                                        className="vid"
                                        key={video.id}
                                        onClick={() => {
                                            listVideo = document.querySelectorAll('.video-list .vid');
                                            mainVideo = document.querySelector('.main-video video');
                                            title = document.querySelector('.main-video .title');
                                            //console.log(video.id);
                                            //console.log(listVideo);
                                            //console.log(mainVideo);
                                            //console.log(title);
                                            //console.log("Quiubo pendejo")
                                            listVideo.forEach(vid => vid.classList.remove('active'));
                                            //listVideo.forEach(vid => vid.classList.toggle('active'));
                                            //listVideo[video.id].classList.toggle('active');
                                            listVideo[video.id].classList.add('active');
                                            if (listVideo[video.id].classList.contains('active')) {
                                                let src = listVideo[video.id].children[0].getAttribute('src');
                                                mainVideo.src = src;
                                                let text = listVideo[video.id].children[1].innerHTML;
                                                title.innerHTML = text;
                                            }
                                        }}
                                    >

                                        <video
                                            src={video.src}
                                            poster={video.poster}
                                            muted ></video>
                                        <h2 className="title">{video.title}</h2>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        )
    }
}