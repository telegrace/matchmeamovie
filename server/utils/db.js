const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

// database is socialnetwork, table is users(name, surname, email, password_hash)
// table for reset_codes

module.exports.registerUser = (name, surname, email, password_hash) => {
    const q = `
    INSERT INTO users (name, surname, email, password_hash) 
    VALUES ($1, $2, $3, $4)
    RETURNING id;`; //use this for cookies
    const params = [name, surname, email, password_hash];
    return db.query(q, params);
};

//email address and password, need to compare password_hash DON'T TOUCH BELOW
module.exports.loginUser = (email) => {
    const q = `
    SELECT * FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.updatePassword = (email, password_hash) => {
    const q = `
    UPDATE users
    SET password_hash = $2
    WHERE email = $1
    `;
    const params = [email, password_hash];
    return db.query(q, params);
};

module.exports.insertCode = (email, code) => {
    const q = `
    INSERT INTO reset_codes (email, code)
    VALUES($1, $2) 
    ON CONFLICT (email) 
    DO UPDATE SET code = $2, created_at = CURRENT_TIMESTAMP
    RETURNING code;`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.checkCode = (email) => {
    const q = `
    SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    AND email = $1;
    `;
    const params = [email];
    return db.query(q, params);
};
//////////////////////////////////////////////////

module.exports.getUser = (id) => {
    const q = `
    SELECT *
    FROM users WHERE id=$1;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.hasProfilePic = (id) => {
    const q = `
    SELECT profile_pic
    FROM users
    WHERE id = $1
    ;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.updateProfilePic = (id, file) => {
    url = "https://s3.amazonaws.com/spicedling/" + file;
    const q = `
    UPDATE users
    SET profile_pic=$1
    WHERE id = $2
    RETURNING *;
    `;
    const params = [url, id];
    return db.query(q, params);
};

module.exports.updateBio = (id, bio) => {
    //this works
    const q = `
    UPDATE users
    SET bio_info=$1
    WHERE id = $2
    RETURNING *;
    `;
    const params = [bio, id];
    return db.query(q, params);
};

//email address and password, need to compare password_hash DON'T TOUCH ABOVE

module.exports.newestUsers = () => {
    const q = `
    SELECT id, name, surname, profile_pic
    FROM users 
    ORDER BY id DESC
    LIMIT 5;
    `;
    return db.query(q);
};

module.exports.findUsers = (val) => {
    const q = `
    SELECT id, name, surname, profile_pic
    FROM users 
    WHERE name ILIKE $1
    LIMIT 5;
    `;
    const params = [val + "%"];
    return db.query(q, params);
};
///////////////////////FIGURING OUT FRIENDS/////////////////////////

module.exports.getFriendshipStatus = (sender_id, recipient_id) => {
    //this works
    const q = `
    SELECT * 
    FROM friendships 
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1);
    `;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.sendFriendRequest = (sender_id, recipient_id) => {
    const q = `
    INSERT INTO friendships (sender_id, recipient_id)
    VALUES($1,$2);
    `;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.acceptFriendRequest = (sender_id, recipient_id) => {
    //this can only upsert
    const q = `
    UPDATE friendships SET accepted = true
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1)
    RETURNING *;
    `;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.deleteFriendshipStatus = (sender_id, recipient_id) => {
    //cancelling, denying and deleting do the same thing
    const q = `
    DELETE FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1);
    `;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.getFriendsList = (sender_id) => {
    const q = `
    SELECT users.id, name, surname, profile_pic, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id= users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id= users.id)
    OR (accepted = true AND sender_id= $1 AND recipient_id = users.id);`;
    const params = [sender_id];
    return db.query(q, params);
};
//this will return users that you're friends with and users who have sent YOU a friend request.
//Users that you've sent a friend request to will NOT show up in this query.

module.exports.getLastTenMessages = () => {
    const q = `
    SELECT messageboard.id, name, surname, profile_pic, message, posted_at
    FROM messageboard
    JOIN users on messageboard.sender_id = users.id
    ORDER BY messageboard.id DESC
    LIMIT 10
    ;`;
    return db.query(q);
};

module.exports.postMessage = (sender_id, message) => {
    const q = `
    INSERT INTO messageboard (sender_id, message)
    VALUES ($1, $2)
    RETURNING *
    ;`;
    const params = [sender_id, message];
    return db.query(q, params);
};

module.exports.getLastMessage = () => {
    const q = `
    SELECT messageboard.id, name, surname, profile_pic, message, posted_at
    FROM messageboard
    JOIN users on messageboard.sender_id = users.id
    ORDER BY messageboard.id DESC
    LIMIT 1
    ;`;
    return db.query(q);
};

module.exports.deleteMessage = (sender_id, message) => {
    const q = `
    DELETE FROM messageboard
    WHERE (sender_id = $1 AND message = $2)
    `;
    const params = [sender_id, message];
    return db.query(q, params);
};

////BONUS PART TO GET ONLINE USERS
module.exports.getUsersByIds = (arrOfIds) => {
    const q = `
    SELECT id, name, surname, profile_pic, 
    FROM users
    WHERE id = ANY ($1)
    ;`;
    const params = [arrOfIds];
    return db.query(q, params);
};

/*
/d details for schema 
and no WHERE for INSERT INTO 
INSERT for create - increasing by one row */
