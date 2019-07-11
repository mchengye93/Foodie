DROP DATABASE IF EXISTS food;

CREATE DATABASE food;

USE food;

CREATE TABLE food (
  id serial PRIMARY KEY,
  cuisine varchar(50) NOT NULL,
  region varchar(50) NOT NULL,
  location varchar(150) NOT NULL,
  foodList text NOT NULL,
  imageUrl text
);

CREATE TABLE restaurants (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  categories varchar(50) NOT NULL,
  price varchar(10) NOT NULL,
  location varchar(150) NOT NULL,
  url text NOT NULL,
  phone varchar(25) NOT NULL,
  image_url text,
  foodList text NOT NULL
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
