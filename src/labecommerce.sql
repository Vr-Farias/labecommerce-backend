-- Active: 1675210596399@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

DROP TABLE users;

INSERT INTO users (id, email, password)
VALUES ("1", "vanessa@gmail.com", "socorro123")

SELECT * FROM users;


INSERT INTO users( id, email, password)
VALUES
("2", "hugo@gmail.com", "hfsdm123"),
("3", "igor@gmail.com", "fazoL123");

SELECT * from users;

-- ================================= 

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL, 
    category TEXT NOT NULL
);


INSERT INTO products (id, name, price, category)
VALUES
    ("1", "televisão", 5000, "eletrônicos"),
    ("2", "xiaomi A9", 2000, "eletrônicos"),
    ("3", "tênis nike", 500, "calçados"),
    ("4", "camisa vomit3d", 100, "vestuário"),
    ("5", "calça vomit3d", 200, "vestuário");

SELECT * FROM products;


DROP TABLE products;
-- ====================================

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    total_price REAL UNIQUE NOT NULL, 
    paid INTEGER NOT NULL, 
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
    ("pc001",5000,1,"1"),
    ("pc002",3000,0,"3"),
    ("pc003",4000,0,"2");

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
    ("pc004",6000,1,DATETIME('now'),"2"),
    ("pc005",7000,0,DATETIME('now'),"3"),
    ("pc006",8000,1,DATETIME('now'),"1");

-- SELECT * FROM purchases;

-- =====================

SELECT 
users.id AS idUsers,
purchases.id,
purchases.total_price,
purchases.paid,
purchases.delivered_at
FROM purchases
JOIN users ON purchases.buyer_id = users.id
WHERE users.id = "2"