import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//using hooks
export default function FindMovies() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultMovies, setResultMovies] = useState();
    const [trendingMovies, setTrendingMovies] = useState();

    useEffect(function () {
        axios.get("/trending-movies").then(({ data }) => {
            console.log("Grace", data.trending);
            setTrendingMovies(data.trending);
        });
    }, []);

    useEffect(
        function () {
            axios.get("/api/movie" + searchTerm).then(({ data }) => {
                console.log("Grace", data);
                setResultMovies(data);
            });
        },
        [searchTerm]
    );

    function changeHandler({ target }) {
        setSearchTerm(target.value);
        console.log(target.value);
    }

    return (
        <div className="find-movies">
            <div className="find-movies-search">
                Have a movie in mind?
                <input defaultValue="" onChange={changeHandler}></input>
            </div>
            {trendingMovies && !searchTerm && (
                <h2>This Week's Trending Movies</h2>
            )}
            {/* {resultMovies && searchTerm && <h2>Results</h2>} */}

            <div id="find-movies-results">
                {trendingMovies &&
                    !searchTerm &&
                    trendingMovies.map(function (movie) {
                        return (
                            <div key={movie.id}>
                                <a href={`https://image.tmdb.org/`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    />
                                </a>
                                <p>{movie.title}</p>
                            </div>
                        );
                    })}
                {/* {resultMovies &&
                    resultMovies.map(function (movie) {
                        return (
                            <div key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img src={user.profile_pic} />
                                </Link>
                                <Link to={`/user/${user.id}`}>
                                    {user.name} {user.surname}
                                </Link>
                            </div>
                        );
                    })} */}
            </div>
        </div>
    );
}

// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
