import axios from "./axios";
import { useState, useEffect } from "react";

//using hooks

// ADD MOVIE
// REMOVE MOVIE
// WATCHED MOVIE
// TO WATCH
let data;
export default function MovieButton({ recipient_id }) {
    const [MovieButton, setMovieButton] = useState();

    useEffect(function () {
        console.log("I am the movie button.");
        // axios.get("/api/friendship-status/" + recipient_id).then(({ data }) => {
        //     setMovieButton(data);
        // });
    }, []);

    // function handleClick() {
    //     console.log("Grace", MovieButton);
    //     axios
    //         .post("/friend-button/" + recipient_id, MovieButton)
    //         .then(({ data }) => {
    //             if (data) {
    //                 setMovieButton(data);
    //             } else {
    //                 console.log("data fail");
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("err in axios POST /handleClick Button: ", err);
    //         });
    // }

    return (
        <div>
            {/* <button onClick={() => handleClick()}>{MovieButton}</button> */}
            <button>ADD/REMOVE</button>
        </div>
    );
}
