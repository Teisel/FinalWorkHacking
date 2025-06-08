import { Fragment } from "react";
import { Component } from "react/cjs/react.production.min";
import { Link } from "react-router-dom";

//Teisel Rivera
export class LoginButton extends Component {
    render() {
        return (
            <Fragment>
                <Link to="/LogIn">
                    <button type="button" className="btn btn-primary" >
                        Iniciar sesión
                    </button>
                </Link>
            </Fragment>
        )
    }
}