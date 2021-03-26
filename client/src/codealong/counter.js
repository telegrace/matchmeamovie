import { Component } from "react";

// Class components allow you to have "state"
// "state" is the Vue equivalent of data!
// can do everything a function component does plus more! (use state, lifecycle methods, etc)

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            name: "",
        };

        // this.incrementCount = this.incrementCount.bind(this);
    }

    // this is a lifecycle method!
    componentDidMount() {
        console.log("component mounted!!!");
    }

    // these are functions you created!
    incrementCount() {
        // console.log("incrementing!!!!");
        this.setState({
            count: this.state.count + 1,
        });
    }

    handleChange(e) {
        this.setState({
            name: e.target.value,
        });
    }

    render() {
        return (
            <div>
                <h1>I am the counter! The count is: {this.state.count}</h1>
                <button onClick={() => this.incrementCount()}>Click Me!</button>
                <input onChange={(e) => this.handleChange(e)}></input>
                <div>{this.state.name}</div>
            </div>
        );
    }
}

// if you run your method this way, you HAVE to bind "this"!
// <button onClick={this.incrementCount}>Click Me!</button>
