import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//using hooks
export default function FindMovies() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultMovies, setResultMovies] = useState();
    const [trendingMovies, setTrendingMovies] = useState();
    const [isToggled, setToggled] = useState(false);

    useEffect(function () {
        axios.get("/trending-movies").then(({ data }) => {
            console.log("Grace", data.trending);
            setTrendingMovies(data.trending);
        });
    }, []);

    useEffect(
        function () {
            axios.get("/api/movie/" + searchTerm).then(({ data }) => {
                console.log("Grace", data);
                setResultMovies(data.searchResults);
            });
        },
        [searchTerm]
    );

    function changeHandler({ target }) {
        setSearchTerm(target.value);
        console.log(target.value);
    }
    const toggleTrueFalse = (event) => {
        event.preventDefault();
        setToggled(!isToggled);
    };

    return (
        <div className="find-movies">
            <div className="find-movies-search">
                Have a movie in mind?
                <input defaultValue="" onChange={changeHandler}></input>
            </div>

            {trendingMovies && !searchTerm && (
                <h2>This Week's Trending Movies</h2>
            )}
            {resultMovies && searchTerm && <h2>Results</h2>}

            <div id="find-movies-results">
                {trendingMovies &&
                    !searchTerm &&
                    trendingMovies.map(function (movie) {
                        return (
                            <div key={movie.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                />
                                <div className="movie-name-link">
                                    <h4 onClick={toggleTrueFalse}>
                                        {movie.title}
                                    </h4>
                                </div>
                                {isToggled && (
                                    <div id="movie-info">
                                        {movie.overview}
                                        <button onClick={toggleTrueFalse}>
                                            CLOSE
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                {resultMovies &&
                    resultMovies.map(function (movie) {
                        let imageUrl = movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "movie.png";

                        return (
                            <div key={movie.id}>
                                <img src={imageUrl} onClick={toggleTrueFalse} />
                                <div className="movie-name-link">
                                    <h4 onClick={toggleTrueFalse}>
                                        {movie.title}
                                    </h4>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
