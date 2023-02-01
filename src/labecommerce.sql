-- Active: 1675210596399@@127.0.0.1@3306
CREATE TABLE users (
	id INTEGER PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

DROP TABLE users;

INSERT INTO users (id, email, password)
VALUES (1, "vanessa@gmail.com", "socorro123")

SELECT * FROM users;


INSERT INTO users( id, email, password)
VALUES
(2, "hugo@gmail.com", "hfsdm123"),
(3, "igor@gmail.com", "fazoL123");

SELECT * from users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL, 
    category TEXT NOT NULL
);


INSERT INTO products (id, name, price, category)
VALUES
    (1, "televisão", 5000, "eletrônicos"),
    (2, "xiaomi A9", 2000, "eletrônicos"),
    (3, "tênis nike", 500, "calçados"),
    (4, "camisa vomit3d", 100, "vestuário"),
    (5, "calça vomit3d", 200, "vestuário")

SELECT * FROM products;