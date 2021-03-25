--sudo service postgresql start
DROP TABLE IF EXISTS reset_codes ; 
DROP TABLE IF EXISTS users CASCADE; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name <> ''),
    surname VARCHAR NOT NULL CHECK (surname <> ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    password_hash VARCHAR NOT NULL CHECK (password_hash <> ''),
    profile_pic VARCHAR, 
    bio VARCHAR, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reset_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE REFERENCES users (email),
    code VARCHAR NOT NULL CHECK (code <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




