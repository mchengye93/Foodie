DROP DATABASE IF EXISTS foodie;

CREATE DATABASE foodie;

USE foodie;


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
