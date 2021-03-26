DROP TABLE IF EXISTS friendships; 

CREATE TABLE friendships( 
    id SERIAL PRIMARY KEY, 
    sender_id INT REFERENCES users(id) NOT NULL, 
    recipient_id INT REFERENCES users(id) NOT NULL, 
    accepted BOOLEAN DEFAULT false 
);

INSERT INTO friendships (sender_id, recipient_id)
VALUES(2,5);

INSERT INTO friendships (sender_id, recipient_id, accepted)
VALUES(4,2, true);