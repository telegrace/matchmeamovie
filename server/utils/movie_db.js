const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/matchmeamovie"
);

module.exports.addMovie = (user_id, media_type, api_id, title, image_url) => {
    const q = `
    INSERT INTO movies (user_id, media_type, api_id, title, image_url)
    VALUES($1, $2, $3, $4, $5) 
    RETURNING movies;`;
    const params = [user_id, media_type, api_id, title, image_url];
    return db.query(q, params);
};

module.exports.getMovieList = (user_id) => {
    const q = `
    SELECT * 
    FROM movies 
    WHERE user_id = $1
    VALUES($1)
    ;`;
    const params = [user_id];
    return db.query(q, params);
};

//if conflict movie has already been added
