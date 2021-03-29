import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//using hooks
export default function FindMovies() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultMovies, setResultMovies] = useState();
    const [trendingMovies, setTrendingMovies] = useState();

    useEffect(
        function () {
            searchTerm &&
                axios.get("/api/movie/" + searchTerm).then(({ data }) => {
                    console.log("Grace", data);
                    setResultMovies(data.searchResults);
                });
        },
        [searchTerm]
    );

    useEffect(function () {
        axios.get("/trending-movies").then(({ data }) => {
            console.log("trending", data.trending);
            setTrendingMovies(data.trending);
        });
    }, []);

    function changeHandler({ target }) {
        if (!target.value) {
            setResultMovies(null);
        }
        setSearchTerm(target.value || null);
        console.log(target.value);
    }

    // const clickMovie = ({ target }) => {
    //     console.log("Grace clicked!", target.previousSibling);
    //     return (
    //         <div className="find-movies">
    //             <h4>See this?</h4>;
    //         </div>
    //     );
    // };

    return (
        <div className="find-movies">
            <div className="find-movies-search">
                Have a movie in mind?
                {/* document.createElement('INPUT').value =="" // true */}
                <input defaultValue=" " onChange={changeHandler}></input>
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
                {resultMovies &&
                    resultMovies.map(function (movie) {
                        let imageUrl = movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "movie.png";
                        if (!movie.media_type) {
                            movie.media_type = "movie";
                        }
                        return (
                            <div key={movie.id}>
                                <Link
                                    to={`/movie-info/${movie.media_type}/${movie.id}`}
                                >
                                    <img src={imageUrl} />
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

// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
