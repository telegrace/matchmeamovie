import Greetee from "./greetee";
import Counter from "./counter";

export default function HelloWorld() {
    const firstName = "Grace";
    return (
        <div className="spiced">
            <div>
                Hello, <Greetee fennel={firstName} />
            </div>
            <div>
                Hello, <Greetee fennel="SPICED" />
            </div>
            <div>
                Hello, <Greetee fennel={firstName} />
            </div>
        </div>
    );
}
