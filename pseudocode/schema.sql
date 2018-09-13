CREATE DATABASE pseudocode_db;
USE pseudocode_db;

CREATE TABLE tasks
(
    id int NOT NULL
    AUTO_INCREMENT,
task varchar
    (255) NOT NULL,
PRIMARY KEY
    (id)
);

    INSERT INTO tasks
        (task)
    VALUES
        ('Show demo');

    DROP DATABASE pseudocode_db;