DROP DATABASE IF EXISTS userlist;
CREATE DATABASE userlist;

\c userlist;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR
);
