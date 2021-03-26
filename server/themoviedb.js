const axios = require("axios");
const express = require("express");
const router = express.Router();
const { key } = require("./config/themoviedb_key.json");

router.get("/getTopTenList", (req, res) => {
    console.log("getTopTenList");
    axios
        .get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=2242bf7aeb8a5c23ca38e03312bca1e9`
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});
exports.router = router;
