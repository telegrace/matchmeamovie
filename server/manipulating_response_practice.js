const results = [
    {
        original_language: "en",
        original_title: "Zack Snyder's Justice League",
        poster_path: "/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg",
        video: false,
        vote_average: 8.7,
        overview:
            "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
        release_date: "2021-03-18",
        id: 791373,
        vote_count: 3529,
        adult: false,
        backdrop_path: "/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg",
        title: "Zack Snyder's Justice League",
        genre_ids: [28, 2],
        popularity: 11462.725,
        media_type: "movie",
    },
    {
        genre_ids: [10765, 10759, 18],
        title: "Godzilla vs. Kong",
        original_language: "en",
        original_title: "Godzilla vs. Kong",
        poster_path: "/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg",
        video: false,
        vote_average: 7.3,
        overview:
            "In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.",
        release_date: "2021-03-24",
        vote_count: 49,
        id: 399566,
        adult: false,
        backdrop_path: "/iopYFB1b6Bh7FWZh3onQhph1sih.jpg",
        popularity: 3745.657,
        media_type: "movie",
    },
    {
        original_name: "The Falcon and the Winter Soldier",
        first_air_date: "2021-03-19",
        genre_ids: [28, 878],
        original_language: "en",
        poster_path: "/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
        vote_count: 1690,
        name: "The Falcon and the Winter Soldier",
        id: 88396,
        overview:
            "Following the events of “Avengers: Endgame”, the Falcon, Sam Wilson and the Winter Soldier, Bucky Barnes team up in a global adventure that tests their abilities, and their patience.",
        vote_average: 7.7,
        origin_country: [Array],
        backdrop_path: "/hHPt8wkicOJYN7P1kSvp2ygsBNh.jpg",
        popularity: 3700.8,
        media_type: "tv",
    },
    {
        backdrop_path: "/ifGVUbvl36CnY9mp4kquK8In1Rh.jpg",
        genre_ids: [1, 3, 5],
        first_air_date: "2021-03-25",
        original_language: "en",
        poster_path: "/s1wP1YeQS9fgSHiXZ3yJb2ufB2D.jpg",
        vote_average: 6.7,
        name: "DOTA: Dragon's Blood",
        id: 118956,
        vote_count: 3,
        overview:
            "After encounters with a dragon and a princess on her own mission, a Dragon Knight becomes embroiled in events larger than he could have ever imagined.",
        origin_country: [Array],
        original_name: "DOTA: Dragon's Blood",
        popularity: 46.354,
        media_type: "tv",
    },
    {
        adult: false,
        backdrop_path: "/4AIIaRA8zMTtUIAEqTMp99FLWJN.jpg",
        genre_ids: [1000, 2, 18],
        id: 797394,
        original_language: "ru",
        original_title: "Ганзель, Гретель и Агентство Магии",
        overview:
            "The Secret Magic Control Agency sends its two best agents, Hansel and Gretel, to fight against the witch of the Gingerbread House.",
        poster_path: "/4ZSzEDVdxWVMVO4oZDvoodQOEfr.jpg",
        release_date: "2021-03-18",
        title: "Secret Magic Control Agency",
        video: false,
        vote_average: 7.6,
        vote_count: 7,
        popularity: 12.632,
        media_type: "movie",
    },
];

let genres_list = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
];

// // const buildObject = (genres_list) => {
// //     const obj = {};
// //     for (let i = 0; i < genres_list.length; i++) {
// //         const { id, name } = genres_list[i];
// //         obj[id] = name;
// //     }
// //     return obj;
// // };
// // let genres = buildObject(genres_list);

// // for (i = 0; i < results.length; i++) {
// //     let genre_ids = results[i].genre_ids;
// //     for (j = 0; j < genre_ids.length; j++) {
// //         let search_id = genre_ids[j];
// //         if (genres[search_id]) {
// //             console.log(genres[search_id]);
// //         } else {
// //             console.log("Surprise");
// //         }
// //     }
// // }

// const array1 = [1, 4, 9, 16];

// // pass a function to map
// const map1 = array1.map((x) => x * 2);

// console.log(map1);
// // expected output: Array [2, 8, 18, 32]

// let testArr = [...results];

// const mapTitleName = (arr) => {
//     arr = arr.map((movie) => {
//         return {
//             ...movie,
//             title: movie.title || movie.name,
//         };
//     });
//     return arr;
// };

// console.log(mapTitleName(testArr));

let a = -1;
// if (a < 0) {
//     console.log(true);
// } else {
//     console.log(false);
// }

let left = a > 0 ? true : false;
//if minus false
console.log(left);
