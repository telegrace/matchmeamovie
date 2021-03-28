import axios from "./axios";
import { useState, useEffect } from "react";

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
                    return (
                        <div className="top-ten" key={movie.id}>
                            <a
                                href={`https://www.themoviedb.org/search?query=${movie.title}`}
                            >
                                {movie.title} <em>({movie.genre})</em>
                            </a>
                        </div>
                    );
                })}
        </div>
    );
}
