// src/greetee.js
export default function Greetee(props) {
    console.log("props in greetee: ", props);
    return <span>{props.name || "FENNEL FRIENDS"}</span>;
}

// or destructuring your props
// export default function Greetee({ name }) {
//     return <span>{name || "FENNEL FRIENDS"}</span>;
// }
