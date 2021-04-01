const axios = require("axios");
const express = require("express");
const router = express.Router();
const movie_db = require("./utils/movie_db");
const { key } = require("./config/themoviedb_key.json");

///////////////////
/////functions/////
///////////////////

const buildObject = (genres_list) => {
    //FUTURE GRACE please make dynamic
    const obj = {};
    for (let i = 0; i < genres_list.length; i++) {
        const { id, name } = genres_list[i];
        obj[id] = name;
    }
    return obj;
};

const mapTitleName = (arr) => {
    arr = arr.map((movie) => {
        return {
            ...movie,
            title: movie.title || movie.name,
        };
    });
    return arr;
};

const findGenre = (arr) => {
    for (i = 0; i < arr.length; i++) {
        let genre_ids = arr[i].genre_ids;
        for (j = 0; j < genre_ids.length; j++) {
            let search_id = genre_ids[j];
            if (genres[search_id]) {
                arr[i].genre = genres[search_id];
                break;
            } else {
                arr[i].genre = "Surprise";
            }
        }
    }
};

let genres;

///////////////////
//////routes///////
///////////////////

router.get("/top-ten-today", (req, res) => {
    axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`)
        .then(({ data }) => {
            genres = buildObject(data.genres);
        });

    axios
        .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
        .then(function (obj) {
            let topTenList = obj.data.results.slice(0, 10);
            //this sorts out the inconsistency
            topTenList = mapTitleName(topTenList);
            findGenre(topTenList);
            res.json({
                topTenList: topTenList,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.get("/trending-movies", (req, res) => {
    axios
        .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${key}`)
        .then(({ data }) => {
            let trending = data.results.slice(0, 5);
            trending = mapTitleName(trending);
            findGenre(trending);
            res.json({
                trending: trending,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.get("/api/movie/:searchTerm", (req, res) => {
    axios
        .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${req.params.searchTerm}`
        )
        .then(({ data }) => {
            let searchResults = data.results.slice(0, 10);
            searchResults = mapTitleName(searchResults);
            findGenre(searchResults);
            res.json({
                searchResults: searchResults,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    console.log(req.params.searchTerm);
});

router.get("/api/movie-info/:media_type/:id", (req, res) => {
    console.log("GRACE", req.params.media_type, req.params.id);
    axios
        .get(
            `https://api.themoviedb.org/3/${req.params.media_type}/${req.params.id}?api_key=${key}`
        )
        .then(({ data }) => {
            findGenre(data);
            //want original_language, title, vote_average, poster_path, overview
            res.json({
                movie_data: data,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});

router.post("/api/add-movie/:media_type/:id/:title/:image", (req, res) => {
    console.log("User swiped right", req.session.userId);
    movie_db
        .addMovie(
            req.session.userId,
            req.params.media_type,
            req.params.id,
            req.params.title,
            req.params.image
        )
        .then(({ rows }) => {
            console.log(rows[0]);
            res.json({ data: rows[0] });
        });
});

// router.post("/api/:id/get-movielist", (req, res) => {
//     console.log("get", req.session.userId);
//     movie_db.getMovieList(req.params.id).then(({ rows }) => {
//         res.json({
//             movies: rows,
//             success: true,
//         });
//     });
// });

router.get("/api/get-movielist", (req, res) => {
    console.log("get", req.session.userId);
    movie_db.getMovieList(req.session.userId).then(({ rows }) => {
        console.log("GRACE", rows);
        res.json({
            movies: rows,
        });
    });
});

router.get("/api/all-get-movielist", (req, res) => {
    console.log("get", req.session.userId);
    movie_db.getAllMovieList(req.session.userId).then(({ rows }) => {
        console.log("GRACE", rows);
        res.json({
            movies: rows,
        });
    });
});

router.get("/api/other-movie-list/:recipient_id", (req, res) => {
    console.log("OTHER GRACE", req.params.recipient_id);
    movie_db.getAllMovieList(req.params.recipient_id).then(({ rows }) => {
        console.log("GRACE", rows);
        res.json({
            movies: rows,
        });
    });
});
// watchedTrueOrFalse;
exports.router = router;

//for practice         .get(`https://restcountries.eu/rest/v2/all`)
//limit not supported

//to get tredning this week  https://api.themoviedb.org/3/discover/movie?api_key=2242bf7aeb8a5c23ca38e03312bca1e9&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_release_type=3%7C2
