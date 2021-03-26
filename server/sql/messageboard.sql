DROP TABLE IF EXISTS messageboard; 

CREATE TABLE messageboard( 
    id SERIAL PRIMARY KEY, 
    sender_id INT REFERENCES users(id) NOT NULL, 
    message VARCHAR, 
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO messageboard (sender_id, message)
VALUES (2,'Much Wow');

INSERT INTO messageboard (sender_id, message)
VALUES (20,'So beautiful');

INSERT INTO messageboard (sender_id, message)
VALUES (42,'Clap!');

INSERT INTO messageboard (sender_id, message)
VALUES (102,'Much mystery');

INSERT INTO messageboard (sender_id, message)
VALUES (88,'such treat');

INSERT INTO messageboard (sender_id, message)
VALUES (27,'wow such tempt');

INSERT INTO messageboard (sender_id, message)
VALUES (26,'very taste');

INSERT INTO messageboard (sender_id, message)
VALUES (32,'Much happy');

INSERT INTO messageboard (sender_id, message)
VALUES (121,'will bark');

INSERT INTO messageboard (sender_id, message)
VALUES (200,'No');

INSERT INTO messageboard (sender_id, message)
VALUES (5,'Many HTML');
