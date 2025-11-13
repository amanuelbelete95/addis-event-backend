CREATE DATABASE events;

CREATE TABLE event (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    event_date DATE,
    event_status VARCHAR(200),
    description TEXT
);

ALTER TABLE event
ADD COLUMN location VARCHAR(200);


INSERT INTO event (
    name, event_date, event_status, description, location
)
VALUES ()