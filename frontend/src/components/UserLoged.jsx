import { Fragment } from "react";
import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";
import axios from "axios";

const searchNot = "http://localhost:8080/api/notification/";
const User = "User.user";
let user = null;
let dropp = false;
//Teisel Rivera
export class UserLoged extends Component {

    state = 
    {
        notifications: []
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

    logOutUser = () => {
        localStorage.removeItem(User);
    }

    peticionGet = () => {
        if (user !== null)
        {
           axios.get(searchNot + user.id)
           .then(response => {
            this.setState({notifications: response.data})
           }) 
        }
    }

    componentDidMount() {
        this.peticionGet();
    }

    render() {
        return (
            <Fragment>
                {this.useEffect()}
                <div className="divIna">
                    <Link to="/Profile">
                        <img src={user.pic} id="imgUserInicio" alt="Fotos/Logo2.png" />
                    </Link>
                    <Link to="/Profile">
                        <label className="textInicio">{user.name}</label>
                    </Link>
                    <div className="dropdown">
                        <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Notificaciones
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {this.state.notifications.map(not => {
                                return(
                                    <li className="dropdown-item" key = {not.id}>{not.text}</li>
                                )
           
                            })

                            }
                        </ul>
                    </div>
                    <Link to="/LogIn">
                        <button className="btn btn-danger"
                            onClick={() => { this.logOutUser() }}
                        >
                            Cerrar sesión
                        </button>
                    </Link>
                </div>
            </Fragment>
        )
    }
}