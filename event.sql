create database events;

create table event (
  event_id serial primary key,
  name VARCHAR(200),
  event_date date,
  event_status VARCHAR(200),
  description TEXT
);

alter table event
add column location VARCHAR(200);

insert into
  event (
    name,
    event_date,
    event_status,
    description,
    location
  )
values
  ();

select
  *
from
  event;

  gg_


create table users (
  id serial primary key,
  name varchar(200) not null,
  email VARCHAR(200) unique not null,
  password VARCHAR(250),
  created_at timestamp default current_timestamp
);