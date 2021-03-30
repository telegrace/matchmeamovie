import axios from "./axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TopTen() {
    const [resultUsers, setResultUsers] = useState();

    useEffect(function () {
        axios.get("/top-ten-today").then(({ data }) => {
            // console.log(data.topTenList);
            setResultUsers(data.topTenList);
        });
    }, []);

    return (
        <div id="ticker">
            <h3>Today's Top Ten</h3>
            {resultUsers &&
                resultUsers.map(function (movie) {
                    if (!movie.media_type) {
                        movie.media_type = "movie";
                    }
                    return (
                        <div className="top-ten" key={movie.id}>
                            <Link
                                to={`/movie-info/${movie.media_type}/${movie.id}`}
                            >
                                {movie.title} <em>({movie.genre})</em>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
}
