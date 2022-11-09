CREATE TABLE IF NOT EXISTS users(
	id serial primary key,
    name text not null,
    email text unique not null,
    password text not null
);

CREATE TABLE IF NOT EXISTS tasks(
	id serial primary key,
  	description text not null,
  	date_creation timestamp,
  	date_finish timestamp,
  	status text default 'open',
  	user_id int REFERENCES users(id) not null
);
