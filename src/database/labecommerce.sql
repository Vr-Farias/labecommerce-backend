-- Active: 1675210596399@@127.0.0.1@3306
CREATE TABLE users (
	id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NO NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES 
("01", "Vanessa", "vanessa@gmail.com", "socorro123"),
("02","Hugo", "hugo@gmail.com", "hfsdm123"),
("03","Igor", "igor@gmail.com", "fazoL123"),
("04", "Bardo", "bardobardo@batata.com", "tocaraul");


SELECT * FROM users;
-- ================================= 

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL, 
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);


INSERT INTO products (id, name, price, description, category, image_url)
VALUES
    (
        "01",
        "calça vomit3d",
         200, 
         "calça moletom ilustrada",
         "vestuário", 
         "https://gkpb.com.br/wp-content/uploads/2021/12/gkpb-vomit3d-colecao-one-piece-laboon.jpg"
    ),
    (
        "02", 
        "xiaomi 9A", 
        2000, 
        "aparelho celular modelo Mi A9",
        "eletrônicos",
        "https://d1r6yjixh9u0er.cloudfront.net/Custom/Content/Products/17/89/1789_redmi-9a-32gb_m25_637838907707297495.jpg"
    ),
    (
        "03", 
        "tênis nike", 
        200, 
        "tênis airforce one",
        "calçados",
        "https://imgnike-a.akamaihd.net/1920x1920/01301252.jpg"
    ),
    (
        "04", 
        "camisa vomit3d", 
        100, 
        "camisa ilustrada especial",
        "vestuário",
        "https://lookgeekhome.files.wordpress.com/2021/12/1638485742775.jpg"
    ),
    (
        "05", 
        "televisão", 
        5000, 
        "aparelho eletrônico de televisão",
        "eletrônicos",
        "https://images.samsung.com/is/image/samsung/p6pim/br/un50au7700gxzd/gallery/br-uhd-4k-tv-un50au7700gxzd---532138276?$650_519_PNG$"
    );


SELECT * FROM products;

SELECT * FROM products WHERE name LIKE "%televisão%";

-- ====================================

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    buyer TEXT NOT NULL, 
    total_price REAL UNIQUE NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    paid INTEGER NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

SELECT * FROM purchases;

INSERT INTO purchases (id, buyer, total_price, paid)
VALUES
    ("pc001", "04", 5000,0),
    ("pc002","01", 3000, 1);

-- =====================

SELECT 
users.id AS idUsers,
purchases.id,
purchases.total_price,
purchases.created_at, 
purchases.paid
FROM purchases
JOIN users ON purchases.buyer = users.id
WHERE users.id = "01";

-- ===================================== 

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL, 
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
    );

SELECT * FROM purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES ("pc001","05", 1),
        ("pc002","03", 15);

SELECT
purchases.id,
purchases.buyer,
purchases.total_price,
purchases.created_at,
purchases.paid,
purchases_products.product_id AS productId,
purchases_products.quantity,
products.name,
products.price,
products.description,
products.category
FROM purchases
LEFT JOIN purchases_products 
ON purchases_products.purchase_id = purchases.id
INNER JOIN products 
ON purchases_products.product_id = products.id;
