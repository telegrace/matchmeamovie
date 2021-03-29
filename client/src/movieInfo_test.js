import axios from "axios";
import { useState, useEffect } from "react";
import { match } from "react-router-dom";
import MovieButton from "./movieButton";

export default function movieInfo() {
    const [movie, setMovie] = useState();
    const [xStart, setXStart] = useState();
    const [xEnd, setXEnd] = useState();

    useEffect(function () {
        console.log(props.match);
        // axios
        //     .get(
        //         `/api/movie-info/${this.props.match.params.media_type}/${this.props.match.params.id}`
        //     )
        //     .then(({ data }) => {
        //         setMovie(data.movie_data);
        //     });
    }, []);

    return <div className="movie-info">GRACE</div>;
}
