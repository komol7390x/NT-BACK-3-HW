CREATE DATABASE  market;
\c market

-- Admins jadvali
CREATE TABLE admins(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name VARCHAR(256),
    email VARCHAR(256) UNIQUE NOT NULL,
    phone VARCHAR(12) UNIQUE NOT NULL,
    role VARCHAR DEFAULT 'ADMIN',
    is_active BOOLEAN DEFAULT TRUE
);

-- Category jadvali
CREATE TABLE category(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name_category VARCHAR(32) UNIQUE NOT NULL,
    image_url TEXT
);

-- Saller jadvali
CREATE TABLE seller(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name VARCHAR(32) NOT NULL,
    email VARCHAR(256) UNIQUE NOT NULL,
    phone VARCHAR(12) UNIQUE NOT NULL,
    role VARCHAR DEFAULT 'SALLER',
    is_active BOOLEAN DEFAULT TRUE
);

-- Product jadvali
CREATE TABLE product(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name_product VARCHAR(32) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK(price>=0),
    quantity NUMERIC CHECK (quantity>=0),
    category_id INT NOT NULL REFERENCES category(id) ON DELETE CASCADE,
    seller_id INT NOT NULL REFERENCES seller(id) ON DELETE CASCADE
);
