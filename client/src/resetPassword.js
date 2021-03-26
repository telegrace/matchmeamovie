import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            error: false,
        };
    }

    handleRequestClick() {
        console.log("Reset sent and the following sent: ", this.state);
        axios
            .post("/reset/start", this.state)
            .then(({ data }) => {
                console.log(data);
                if (data.success) {
                    console.log("data.success is true");
                    this.setState({
                        step: 2,
                    });
                    console.log(this.state.step);
                    //location.replace("/password/reset/verify");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /reset: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    handleVerifyClick() {
        console.log("Verify Click : ", this.state);
        axios
            .post("/reset/verify", this.state)
            .then(({ data }) => {
                console.log(data);
                if (data.success) {
                    console.log("data.success is true");
                    this.setState({
                        step: 3,
                    });
                    //location.replace("/password/reset/change");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /reset: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    handleChangeClick() {
        console.log("Change Click : ", this.state);
        axios
            .post("/reset/change", this.state)
            .then(({ data }) => {
                console.log(data);
                if (data.success) {
                    this.setState({
                        step: 4,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /reset: ", err);
                this.setState({
                    error: true,
                });
            });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        const { step } = this.state;

        if (step == 1) {
            return (
                <div>
                    <h1>Request Code</h1>
                    {this.state.error && <p>something went wrong :(</p>}
                    <input
                        name="email"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleRequestClick()}>
                        REQUEST
                    </button>
                </div>
            );
        }
        if (step == 2) {
            return (
                <div>
                    <h1>Verify Code</h1>
                    {this.state.error && <p>something went wrong :(</p>}
                    <input
                        name="email"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="code"
                        placeholder="code"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleVerifyClick()}>
                        VERIFY
                    </button>
                </div>
            );
        }
        if (step == 3) {
            return (
                <div>
                    <h1>Change password</h1>
                    {this.state.error && <p>something went wrong :(</p>}
                    <input
                        name="email"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleChangeClick()}>
                        CHANGE
                    </button>
                </div>
            );
        }
        if (step == 4) {
            return (
                <div>
                    <h1>Success!</h1>
                    <Link to="/login">LOGIN HERE</Link>
                </div>
            );
        }
    }
}

//needs to check email exist
