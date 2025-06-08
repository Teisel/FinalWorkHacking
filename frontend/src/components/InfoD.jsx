import { Component, Fragment } from "react";
import axios from "axios";

const infoUserLink = "http://localhost:8080/api/athleteInfo/";
const User = "User.user";
let user = null;


export class InfoD extends Component {
    state = {
        data: []
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

    peticionGet = () => {
        axios.get(infoUserLink + user.id.toString()).then(Response => {
            this.setState({ data: Response.data });
        });
    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {
        return (
            <Fragment>
                {this.useEffect()}
                <label className="textPerfil">{this.state.data.weight}</label>
                <label className="textPerfil">{this.state.data.high}</label>
                <label className="textPerfil">{this.state.data.color}</label>
            </Fragment>
        )
    }
}