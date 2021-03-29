--sudo service postgresql start
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS reset_codes ; 
DROP TABLE IF EXISTS users CASCADE; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name <> ''),
    surname VARCHAR NOT NULL CHECK (surname <> ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    profile_pic VARCHAR, 
    bio_info VARCHAR, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO users (name, surname, email, password_hash)
-- VALUES ('Grace','Plum','grace@plum.uk', '$2a$10$ay7G3ag9wUkZgQahIFWbj.Y.Vz74ZG3dDcuLSqH4heRl.kQW9Srhu');

CREATE TABLE reset_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE REFERENCES users (email),
    code VARCHAR NOT NULL CHECK (code <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    title VARCHAR NOT NULL CHECK (title <> ''),
    movie BOOLEAN,
    api_id INTEGER,
    watched BOOLEAN DEFAULT false 
);

-- INSERT INTO movies (user_id, title, movie, api_id, watched)


