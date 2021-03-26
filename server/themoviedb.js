const axios = require("axios");
const express = require("express");
const router = express.Router();
const { key } = require("./config/themoviedb_key.json");

router.get("/getTopTenList", (req, res) => {
    console.log("getTopTenList");
    axios
        .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
        .then(function (obj) {
            let topTenList = obj.data.results.slice(0, 10);
            topTenList = topTenList.map((movie) => {
                return {
                    ...movie,
                    title: movie.title || movie.name,
                };
            });
            console.log("Grace", topTenList);
            res.json({
                topTenList: topTenList,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
});
exports.router = router;

//for practice         .get(`https://restcountries.eu/rest/v2/all`)
//limit not supported
