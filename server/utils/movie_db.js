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

module.exports.delMovie = (user_id, api_id) => {
    const q = `
    DELETE FROM movies
    WHERE user_id = $1 AND api_id =  $2
    VALUES($1, $2, $3, $4, $5) 
    RETURNING movies;`;
    const params = [user_id, api_id];
    return db.query(q, params);
};

module.exports.getMovieList = (user_id) => {
    const q = `
    SELECT * 
    FROM movies 
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT 5
    ;`;
    const params = [user_id];
    return db.query(q, params);
};

module.exports.getAllMovieList = (user_id) => {
    const q = `
    SELECT * 
    FROM movies 
    WHERE user_id = $1
    ;`;
    const params = [user_id];
    return db.query(q, params);
};

module.exports.watchedTrueOrFalse = (boolean, user_id, api_id) => {
    const q = `
    UPDATE movies
    SET watched = $1, created_at = CURRENT_TIMESTAMP
    WHERE user_id = $2 AND api_id = $3
    VALUES($1, $2, $3)
    RETURNING * 
    ;`;
    const params = [boolean, user_id, api_id];
    return db.query(q, params);
};

//if conflict movie has already been added
