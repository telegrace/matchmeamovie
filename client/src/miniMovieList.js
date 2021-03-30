import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//using hooks
export default function MiniMovieList() {
    const [movieList, setMovieList] = useState();

    useEffect(
        function () {
            console.log("Grace");
            movieList &&
                axios.get("/api/get-movielist").then(({ data }) => {
                    if (data) {
                        console.log("Grace", data);
                        setMovieList(data.rows);
                    } else {
                        console.log("data fail");
                        this.setState({
                            error: true,
                        });
                    }
                });
        },
        [movieList]
    );

    return (
        <div id="mini-movie-list-container">
            <div id="find-movies-results">
                {movieList &&
                    movieList.map(function (movie) {
                        return (
                            <div key={movie.id}>
                                <Link
                                    to={`/movie-info/${movie.media_type}/${movie.id}`}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    />
                                </Link>

                                <div className="movie-name-link">
                                    <h4>{movie.title}</h4>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
