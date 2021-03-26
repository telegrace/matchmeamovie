import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick() {
        console.log("Login sent and the following sent: ", this.state);
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log(data);
                //data is deconstructed straightaway
                if (data.success) {
                    console.log("data.success is true");
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /login: ", err);
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <div id="login">
                <h1>Login</h1>
                {this.state.error && <p>something went wrong :(</p>}
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.handleClick()}>LOGIN</button>
                <br></br>
                <Link to="/">Don't have an account?</Link>
                <br></br>
                <Link to="/reset">Forgot your password?</Link>
            </div>
        );
    }
}
