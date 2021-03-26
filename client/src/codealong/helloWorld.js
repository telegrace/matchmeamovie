// src/helloWorld.js
import Greetee from "./greetee";
import Counter from "./counter";

// this is a functional component whose job is only to render information
// (they cannot have state)
export default function HelloWorld() {
    const firstName = "Andrea";
    return (
        <div className="spiced">
            <div>
                Hello <Greetee name={firstName} />
            </div>
            <div>
                Hello <Greetee name="Fennel" />
            </div>
            <div>
                Hello <Greetee />
            </div>
            <Counter />
        </div>
    );
}

// pay mind as to how we pass information from parent to child above!
