//should this be a class component of function component

import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    handleChange(event) {
        console.log("Handle change is running.");
        console.log("event obj: ", event.target.value);
        this.setState(
            {
                first: event.target.value,
            },
            () => console.log("this.state after setState: ", this.state)
        );
    }

    handleClick() {
        console.log("clicked!");
        axios.post(
            "/registration",
            this.state
                .then(({ data }) => {
                    if (data) {
                        location.replace("/");
                    } else {
                        //render error conditionally
                        this.setState({
                            error: true,
                        });
                    }
                })
                .catch((err) => {
                    //render error message
                    console.log("err is axios POST / registration: ", err);
                })
        );
    }

    render() {
        return (
            <div>
                <h1>Registration</h1>
                {this.state.error && <p>something went wrong</p>}
                <input
                    name="first"
                    placeholder="first"
                    //handleChange is what we define
                    onChange={(event) => this.handleChange(event)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={(event) => this.handleChange(event)}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={(event) => this.handleChange(event)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={(event) => this.handleChange(event)}
                />
                <button onCLick={() => this.handleClick()}>SUBMIT</button>
            </div>
        );
    }
}
