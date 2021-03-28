const axios = require("axios");
const express = require("express");
const router = express.Router();
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
    console.log("GRACE", req.params.searchTerm);
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
exports.router = router;

//for practice         .get(`https://restcountries.eu/rest/v2/all`)
//limit not supported

//to get tredning this week  https://api.themoviedb.org/3/discover/movie?api_key=2242bf7aeb8a5c23ca38e03312bca1e9&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_release_type=3%7C2
