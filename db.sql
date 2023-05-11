CREATE DATABASE shakhruz;

\ c shakhruz;

CREATE TABLE users (
    id VARCHAR UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    cover_img_url VARCHAR,
    online VARCHAR NOT NULL DEFAULT false
);

CREATE TABLE post(
    id VARCHAR UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    title VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    user_id VARCHAR NOT NULL,
    create_post TIME DEFAULT NOW()
);

CREATE TABLE layk(
    id VARCHAR UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    user_id VARCHAR NOT NULL,
    post_id VARCHAR NOT NULL,
    isLike VARCHAR NOT NULL DEFAULT true,
    create_like_ad TIME DEFAULT NOW()
);