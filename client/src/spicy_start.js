import ReactDOM from "react-dom";
import { io } from "socket.io-client";

const socket = io.connect();

socket.on("helloooo", (data) => {
    console.log("data from server: ", data);
});

socket.emit("cool message", ["andrea", "david", "pete"]);

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

function HelloWorld() {
    return (
        <div
            onClick={() => {
                socket.emit(
                    "helloWorld clicked",
                    "hello fennel, im so sad that this is our last encounter! :("
                );
            }}
        >
            Hello, World!
        </div>
    );
}
