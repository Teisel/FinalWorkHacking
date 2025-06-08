import { Component, Fragment } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast as tostada } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = "User.user";
const searchAthlete = "http://localhost:8080/api/users/some/";
const getCompetitors = "http://localhost:8080/api/completeCom/";
const createResult = "http://localhost:8080/api/result"
const createRAthlet = "http://localhost:8080/api/resultAthlete"
const editCategory = "http://localhost:8080/api/category/";
const modifyComp = "http://localhost:8080/api/competitor/";
const createNotifications = "http://localhost:8080/api/notification";
const busqueda = "bus.que";
const userSearched = "user.searched";
const categoryHelp = "category.help";

let errorChido = null;
let user = null;
let cat = null;
//Teisle Rivera
export class InitializedCategory extends Component {

    state = {
        competitors: [],
        results: []
    }

    logOutUser = () => {
        localStorage.removeItem(User);

        //Desactiva la categoria
        localStorage.removeItem(categoryHelp)
        cat.state = false;
        axios.put(editCategory + cat.id, cat)

    }


    tostada = () => {
        tostada.success('Usuario inscrito correctamente', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }
    tostadaEvil = () => {
        tostada.error('Usuario no inscrito', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    async sendResults(valores, result, comA, comB) {
        if (result === 0) {
            let ganador = 0;
            let perdedor = 0;
            if (valores.winner === 'true') {
                ganador = comA.id
                perdedor = comB.id
            }
            else {
                ganador = comB.id
                perdedor = comA.id
            }
            let comW = this.state.competitors.find(competitor => competitor.id === ganador);
            let comL = this.state.competitors.find(competitor => competitor.id === perdedor);

            let modifyComW = {
                id: comW.id,
                idUser: comW.idUser,
                idCategory: comW.idCategory,
                place: 3
            }

            let modifyComL = {
                id: comL.id,
                idUser: comL.idUser,
                idCategory: comL.idCategory,
                place: 4
            }

            await axios
                .put(modifyComp + modifyComW.id, modifyComW);

            await axios
                .put(modifyComp + modifyComL.id, modifyComL);
        }
        else {
            let ganador = {
                idResult: result.result.nextRes,
                idCompetitor: 0,
                fouls: 0,
                points: 0
            }
            let perdedor = 0;
            if (valores.winner === 'true') {
                ganador.idCompetitor = comA.id
                perdedor = comB.id
            }
            else {
                ganador.idCompetitor = comB.id
                perdedor = comA.id
            }
            result.result.winner = ganador.idCompetitor;
            result.result.loser = perdedor;

            if (result.resultAthletes[0].idCompetitor === comA.id) {
                result.resultAthletes[0].fouls = valores.foulsA;
                result.resultAthletes[1].fouls = valores.foulsB;
                result.resultAthletes[0].points = valores.pointsA;
                result.resultAthletes[1].points = valores.pointsB;
            }
            else {
                result.resultAthletes[1].fouls = valores.foulsA;
                result.resultAthletes[0].fouls = valores.foulsB;
                result.resultAthletes[1].points = valores.pointsA;
                result.resultAthletes[0].points = valores.pointsB;
            }

            await axios
                .put(createResult + "/" + result.result.id, result.result)
                .then(s => { console.log(s.data) })
                .catch(error => { console.log(error) })

            await axios
                .put(createRAthlet + "/" + result.resultAthletes[0].id, result.resultAthletes[0])
                .then(s => { console.log(s.data) })
                .catch(error => { console.log(error) })

            await axios
                .put(createRAthlet + "/" + result.resultAthletes[1].id, result.resultAthletes[1])
                .then(s => { console.log(s.data) })
                .catch(error => { console.log(error) })

            if (result.result.nextRes === 0) {
                //Algoritmo para asignar los lugares
                console.log("Hola baboso!!")
                let numMax = 0;
                let lugar = 0;
                if (cat.define) {
                    numMax = result.result.round - 1;
                    lugar = numMax + 2;
                }
                else {
                    numMax = result.result.round;
                    lugar = numMax + 1;
                }

                for (let i = 0; i < this.state.results.length; i++) {
                    if (this.state.results[i].result.round < numMax) {
                        let com = this.state.competitors.find(competitor => competitor.id === this.state.results[i].result.loser);
                        com.place = lugar + (-1 * (this.state.results[i].result.round - 1));
                        let modifyCom = {
                            id: com.id,
                            idUser: com.idUser,
                            idCategory: com.idCategory,
                            place: com.place
                        }

                        await axios
                            .put(modifyComp + modifyCom.id, modifyCom);
                    }
                }
                let comW = this.state.competitors.find(competitor => competitor.id === result.result.winner);
                let comL = this.state.competitors.find(competitor => competitor.id === result.result.loser);

                let modifyComW = {
                    id: comW.id,
                    idUser: comW.idUser,
                    idCategory: comW.idCategory,
                    place: 1
                }

                let modifyComL = {
                    id: comL.id,
                    idUser: comL.idUser,
                    idCategory: comL.idCategory,
                    place: 2
                }

                await axios
                    .put(modifyComp + modifyComW.id, modifyComW);

                await axios
                    .put(modifyComp + modifyComL.id, modifyComL);

                cat.end = true
                axios.put(editCategory + cat.id, cat);
                localStorage.removeItem(categoryHelp)
                window.location.href = "http://localhost:3000/HelpTourney";
            }
            else {
                this.createResultAhlete(ganador);

                window.location.href = "http://localhost:3000/InitializedCategory";
            }

        }


    }

    click = (comA, comB, result) => toast((t) => (
        <div>
            <h2 className="colorPerron">¿Cual fue el resultado?</h2>
            <Formik
                initialValues={{
                    pointsA: '',
                    pointsB: '',
                    foulsA: '',
                    foulsB: '',
                    winner: 'Sepa'
                }}

                validate={(valores) => {
                    let errores = {};
                    if (valores.pointsA === '') {
                        errores.errorMamalon = "Favor de ingresar valores correctos";
                    }
                    if (valores.pointsB === '') {
                        errores.errorMamalon = "Favor de ingresar valores correctos";
                    }
                    if (valores.foulsA === '') {
                        errores.errorMamalon = "Favor de ingresar valores correctos";
                    }
                    if (valores.foulsB === '') {
                        errores.errorMamalon = "Favor de ingresar valores correctos";
                    }
                    if (valores.winner === 'Sepa') {
                        errores.errorMamalon = "Favor de ingresar valores correctos";
                    }

                    if (valores.winner === 'true' && valores.pointsA < valores.pointsB) {
                        errores.errorMamalon = "Favor de ingresar valores correctos";
                    }
                    else {
                        if (valores.winner === 'false' && valores.pointsB < valores.pointsA) {
                            errores.errorMamalon = "Favor de ingresar valores correctos";

                        }
                    }
                    return errores;
                }}

                onSubmit={async (valores) => {
                    if (await this.sendResults(valores, result, comA, comB)) {
                        console.log("Inscrito");
                    }



                    toast.dismiss(t.id)
                    //window.location.href = "http://localhost:3000/InitializedCategory";
                }}
            >
                {({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
                    <form onSubmit={handleSubmit} >
                        <div align="center" className="divInscri">
                            <label>¿Quien fue el ganador?</label>
                            <br />
                            <input className="form-check-input" type="radio" name="winner" id="flexRadioDefault1" value={true} onChange={handleChange} onBlur={handleBlur} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                {comA.name}
                            </label>
                            <input className="form-check-input" type="radio" name="winner" id="flexRadioDefault1" value={false} onChange={handleChange} onBlur={handleBlur} />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                {comB.name}
                            </label>
                        </div>
                        <div align="center" className="divInscri">
                            <label>Puntos de los competidores:</label>
                            <br />
                            <div className="categoriasCabios">
                                <input
                                    type="number"
                                    name="pointsA"
                                    min="0"
                                    step="1"
                                    pattern="^[0-9]+"
                                    placeholder={comA.name}
                                    value={values.pointsA}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-control inputEditprofile"
                                />
                                <input
                                    type="number"
                                    name="pointsB"
                                    min="0"
                                    step="1"
                                    pattern="^[0-9]+"
                                    placeholder={comB.name}
                                    value={values.pointsB}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-control inputEditprofile"
                                />
                            </div>
                        </div>
                        <div align="center" className="divInscri">
                            <label>Faltas de los competidores:</label>
                            <br />
                            <div className="categoriasCabios">
                                <input
                                    type="number"
                                    name="foulsA"
                                    min="0"
                                    max="10"
                                    pattern="^[0-9]+"
                                    step="1"
                                    placeholder={comA.name}
                                    value={values.foulsA}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-control inputEditprofile"
                                />
                                <input
                                    type="number"
                                    name="foulsB"
                                    min="0"
                                    max="10"
                                    pattern="^[0-9]+"
                                    step="1"
                                    placeholder={comB.name}
                                    value={values.foulsB}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-control inputEditprofile"
                                />
                            </div>
                        </div>
                        {errors.errorMamalon && <label className="textError">{errors.errorMamalon}</label>}
                        <div className="divInscri">
                            <button className="btn btn-danger" type="button" id="botonCancelarInscri" onClick={() => toast.dismiss(t.id)}>Cancelar</button>

                            <button type="submit" className="btn btn-primary">Ok</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    ));


    async creaResultados(rondas, resNext) {
        console.log(rondas)
        if (rondas > 0) {
            let result =
            {
                idCategory: cat.id,
                round: rondas,
                winner: 0,
                loser: 0,
                nextRes: resNext,
                resPrevA: 0,
                resPrevB: 0
            }
            let resu = [];
            await axios
                .post(createResult, result)
                .then(res => {
                    rondas--;
                    resu = res.data;
                })

            await this.creaResultados(rondas, resu.id)
            await this.creaResultados(rondas, resu.id)

            await axios
                .get(createResult + "/prevCategories/" + resu.id)
                .then(re => {
                    console.log(re.data)
                    if (re.data.length !== 0) {
                        let editResult = {
                            idCategory: resu.idCategory,
                            round: resu.round,
                            winner: 0,
                            nextRes: resu.nextRes,
                            resPrevA: re.data[0],
                            resPrevB: re.data[1]
                        }
                        axios
                            .put(createResult + "/" + resu.id, editResult)
                            .then(r => {
                                console.log(r);
                            })
                    }
                })

        }
    }


    useEffect = () => {
        const userSesion = JSON.parse(localStorage.getItem(User));
        const category = JSON.parse(localStorage.getItem(categoryHelp));

        if (userSesion) {
            user = userSesion;
        }
        else {
            user = null;
            window.location.href = "http://localhost:3000/";
        }

        if (user.type === "deportista") {
            window.location.href = "http://localhost:3000/";
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
        //CUANDO CIERREN LA PESTAÑA BORRAR EL ESTADO ACTIVO DE LA CATEGORIA

        cat.state = true;
        //Activa la categoria
        axios.put(editCategory + cat.id, cat)
            .then(e => {
                localStorage.setItem(categoryHelp, JSON.stringify(e.data))
            })
        //Obtiene los competidores
        axios
            .get(getCompetitors + cat.id)
            .then(Response => {
                console.log(Response.data);
                this.setState({ competitors: Response.data });
            })
            .catch(error => { console.log(error) })
        //Obtiene los resultados de la gategoria
        axios
            .get(createResult + "/categoryResults/" + cat.id)
            .then(res => {
                //Revuelve los deportistas
                let competitors = this.state.competitors;
                for (let i = 0; i < competitors.length; i = i + 2) {
                    if (i + 1 < competitors.length) {
                        if (competitors[i].idAcademy === competitors[i + 1].idAcademy) {
                            for (let nextCompetitor = i + 2; nextCompetitor < competitors.length; nextCompetitor++) {
                                if (competitors[i].idAcademy !== competitors[nextCompetitor].idAcademy) {
                                    let prevComp = competitors[i + 1];
                                    let newComp = competitors[nextCompetitor];

                                    competitors[i + 1] = newComp;
                                    competitors[nextCompetitor] = prevComp;
                                }
                            }
                        }
                    }
                }
                //console.log(competitors);
                //Verifica si hay resultados en la categoria
                let numeroPerron = 1;
                let rondas = 0;
                let personasEliminadas = 0;
                for (numeroPerron; numeroPerron < this.state.competitors.length; numeroPerron = numeroPerron * 2) {
                    rondas++;
                }
                console.log(rondas);
                if (res.data.length === 0) {
                    //Crea los primeros resultados
                    console.log("hi")
                    this.creaResultados(rondas, 0);
                    for(let i = 0; i < this.state.competitors.length; i++)
                    {
                        let notificatio = 
                        {
                            idUser: this.state.competitors[i].idUser,
                            text: "Se ha iniciado tu categoria"
                        }
                        axios.post(createNotifications, notificatio);
                    }
                    setTimeout(() => {
                        window.location.href = "http://localhost:3000/InitializedCategory"
                    }, 3000);

                }
                else {
                    axios
                        .get(createRAthlet + "/" + cat.id)
                        .then(wa => {
                            if (wa.data.length === 0) {
                                let resultadosPerrones = res.data
                                //Organiza los resultados por ronda
                                for (let i = 0; i < resultadosPerrones.length; i++) {
                                    for (let j = 0; j < (resultadosPerrones.length - i - 1); j++) {
                                        if (resultadosPerrones[j].round > resultadosPerrones[j + 1].round) {
                                            let cam = resultadosPerrones[j];
                                            let bio = resultadosPerrones[j + 1];

                                            resultadosPerrones[j] = bio;
                                            resultadosPerrones[j + 1] = cam;
                                        }
                                    }
                                }

                                if (numeroPerron !== this.state.competitors.length) {
                                    personasEliminadas = this.state.competitors.length - (numeroPerron / 2);
                                }
                                if (personasEliminadas !== 0) {
                                    //Crea combates vacios

                                    let numeroComp = 0;
                                    let numeroRes = 0;
                                    for (let i = 0; i < personasEliminadas; i++) {
                                        for (let j = 0; j < 2; j++) {
                                            let resAt = {
                                                idResult: resultadosPerrones[numeroRes].id,
                                                idCompetitor: competitors[numeroComp].id,
                                                fouls: 0,
                                                points: 0
                                            }
                                            this.createResultAhlete(resAt);
                                            numeroComp++;
                                        }
                                        numeroRes++;
                                    }

                                    for (numeroRes; resultadosPerrones[numeroRes].round === 1; numeroRes++) {
                                        let resAt = {
                                            idResult: resultadosPerrones[numeroRes].id,
                                            idCompetitor: competitors[numeroComp].id,
                                            fouls: 0,
                                            points: 0
                                        }
                                        let resF = {
                                            idResult: resultadosPerrones[numeroRes].id,
                                            idCompetitor: competitors[numeroComp].id,
                                            fouls: 0,
                                            points: 0
                                        }
                                        let resN = {
                                            idResult: resultadosPerrones[numeroRes].nextRes,
                                            idCompetitor: competitors[numeroComp].id,
                                            fouls: 0,
                                            points: 0
                                        }

                                        this.createResultAhlete(resAt);
                                        this.createResultAhlete(resF);
                                        this.createResultAhlete(resN);
                                        //Crear el gane por default

                                        resultadosPerrones[numeroRes].winner = competitors[numeroComp].id;
                                        this.modifyResult(resultadosPerrones[numeroRes]);

                                        numeroComp++;
                                    }
                                }
                                else {
                                    let numeroComp = 0;
                                    let numeroRes = 0;
                                    for (numeroRes; resultadosPerrones[numeroRes].round === 1; numeroRes++) {
                                        for (let j = 0; j < 2; j++) {
                                            let resAt = {
                                                idResult: resultadosPerrones[numeroRes].id,
                                                idCompetitor: competitors[numeroComp].id,
                                                fouls: 0,
                                                points: 0
                                            }
                                            this.createResultAhlete(resAt);
                                            numeroComp++;
                                        }
                                    }
                                }
                                setTimeout(() => {
                                    window.location.href = "http://localhost:3000/InitializedCategory"
                                }, 3000);
                            }
                            else {
                                //Obtener una lista para mapear los resultados
                                axios
                                    .get(createResult + "/getCompleteResults/" + cat.id)
                                    .then(miku => {
                                        for (let i = 0; i < miku.data.length; i++) {
                                            for (let j = 0; j < (miku.data.length - i - 1); j++) {
                                                if (miku.data[j].result.round > miku.data[j + 1].result.round) {
                                                    let cam = miku.data[j];
                                                    let bio = miku.data[j + 1];

                                                    miku.data[j] = bio;
                                                    miku.data[j + 1] = cam;
                                                }
                                            }
                                        }
                                        this.setState({ results: miku.data });
                                    })
                            }
                        })
                    console.log(res.data)

                }
            })
    }

    async modifyResult(resultModify) {
        await axios
            .put(createResult + "/" + resultModify.id, resultModify)
            .then(r => {
                console.log(r);
            })
    }

    async createResultAhlete(resultAthlete) {
        await axios
            .post(createRAthlet, resultAthlete)
            .then(ki => { console.log(ki) })
            .catch(er => { console.log(er) })
    }

    async definirLosers() {

        //cat.state = true;
        //console.log(cat);
        cat.define = true;
        //console.log(cat);

        await axios.put(editCategory + cat.id, cat)
            .then(e => {
                localStorage.setItem(categoryHelp, JSON.stringify(e.data));
                window.location.href = "http://localhost:3000/InitializedCategory";
            })

    }

    hayGanador(result) {
        let value = false;
        if (result.winner > 0) {
            value = true;
        }
        return value
    }

    ganadorCuarto() {
        let value = false;
        if (this.state.competitors.find(competitor => competitor.place === 4)) {
            value = true
        }
        return value

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
                        let Ina = this.state.results[bonito];
                        if (this.state.results[bonito].result) {
                            if (this.state.results[bonito].resultAthletes.length === 2) {
                                comA = this.state.competitors.find(competitor => competitor.id === this.state.results[bonito].resultAthletes[0].idCompetitor);
                                comB = this.state.competitors.find(competitor => competitor.id === this.state.results[bonito].resultAthletes[1].idCompetitor);
                            }
                        }

                        let disable = this.hayGanador(Ina.result);
                        postsPerrones.push(<Fragment key={"" + j + "-" + i}>

                            {
                                this.state.results[bonito].resultAthletes.length !== 2
                                    ? <button className="btn btn-info">Aun estan compitiendo </button>
                                    : <div>
                                        {comA.id === comB.id
                                            ? <div>
                                                <button className="btn btn-info" disabled={disable}> {comA.name}</button>
                                            </div>
                                            : <div>
                                                <button className="btn btn-info" onClick={() => { this.click(comA, comB, Ina) }} disabled={disable}> {comA.name} <br /> VS <br /> {comB.name}</button>
                                            </div>
                                        }
                                    </div>

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

    componentDidMount() {
        this.peticionGet();
    }

    render() {
        return (
            <Fragment>
                <div><Toaster /></div>
                {this.useEffect()}
                {
                    window.addEventListener("beforeunload", function (e) {
                        cat.state = false;
                        //Desactiva la categoria
                        axios.put(editCategory + cat.id, cat)
                    })
                }

                <div>
                    <div aling="center">
                        <table id="headerPerfil" >
                            <tbody>
                                <tr>
                                    <td id="contenedorLogoPerfil">
                                        <Link to="/">
                                            <img src="Logo1.png" className="imgLogo" aling="center" alt="Logo2.png" onClick={() => {
                                                {
                                                    //Desactiva la categoria
                                                    localStorage.removeItem(categoryHelp)
                                                    cat.state = false;
                                                    axios.put(editCategory + cat.id, cat)
                                                }
                                            }} />
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
                                                            localStorage.removeItem(categoryHelp)
                                                            cat.state = false;
                                                            axios.put(editCategory + cat.id, cat)
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
                            <div className="divHelp">
                                {cat.define
                                    ? <button className="btn btn-info" type="button" onClick={() => {
                                        if (this.state.results.find(result => result.result.nextRes === 0).resultAthletes.length === 2) {
                                            let comA = this.state.competitors.find(
                                                competitor => competitor.id === this.state.results.find
                                                    (
                                                        res => res.result.id === this.state.results.find
                                                            (
                                                                result => result.result.nextRes === 0
                                                            )
                                                            .result.resPrevA
                                                    )
                                                    .result.loser)

                                            let comB = this.state.competitors.find(
                                                competitor => competitor.id === this.state.results.find
                                                    (
                                                        res => res.result.id === this.state.results.find
                                                            (
                                                                result => result.result.nextRes === 0
                                                            )
                                                            .result.resPrevB
                                                    )
                                                    .result.loser)

                                            this.click(comA, comB, 0);
                                        }
                                    }}
                                        disabled={this.ganadorCuarto()}
                                    >Resultados 3er y 4to</button>
                                    : <button type="button" className="btn btn-warning"
                                        onClick={() => {
                                            this.definirLosers()
                                        }}
                                    >
                                        Definir un 3er y 4to lugar</button>
                                }

                            </div>
                        </div>

                        <div className="divGraph">
                            {this.funcionPerrona()}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        )

    }
}