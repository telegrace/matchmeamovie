import { render } from "@testing-library/react";
import ReactDOM from "react-dom"; //lets us use in browser
import Welcome from "./welcome";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>my main page of website</p>;
}

//ReactDOM can only render one component
ReactDOM.render(<Welcome />, document.querySelector("main"));
