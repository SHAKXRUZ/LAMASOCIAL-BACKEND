import pool from "../config/db_config.js";
import jwt from "jsonwebtoken";
const getUsers = async (req, res) => {
  try {
    let userList = await pool.query("select * from users");
    res.status(201).send(userList.rows);
  } catch {
    res.send({ msg: "Error" });
  }
};
const getUser = async (req, res) => {
  try {
    const { token } = req.headers;

    let verifyTokenUserId = (await token)
      ? jwt.verify(token, process.env.SECRET_KEY).id
      : res.status(401).send({ msg: "Token mavjud emas!" });

    let userObj = await pool.query("select * from users where id = $1", [
      verifyTokenUserId,
    ]);

    let userImagesUrl = userObj.rows[0].img_url;
    let userCoverImagesUrl = userObj.rows[0].cover_img_url;

    res.status(201).send({ userImagesUrl, userCoverImagesUrl });
  } catch {
    res.send({ msg: "Error" });
  }
};

const profelUserUpdate = async (req, res) => {
  try {
    const { img_url, token } = req.body;

    let verifyTokenUserId = token
      ? jwt.verify(token, process.env.SECRET_KEY).id
      : res.status(401).send({ msg: "Token mavjud emas!" });

    let userProfel = await pool.query("select * from users where id = $1", [
      verifyTokenUserId,
    ]);

    if (!userProfel.rows[0]) {
      return res.status(404).send({ msg: "User not found!" });
    }

    if (img_url) {
      await pool.query(`update users set img_url = $1 where id = $2`, [
        img_url,
        userProfel.rows[0].id,
      ]);
    }

    return res.status(201).send({ msg: "Profel images update!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const coverImagesUpdate = async (req, res) => {
  try {
    const { coverImages, token } = await req.body;

    let userId = token
      ? jwt.verify(token, process.env.SECRET_KEY).id
      : res.status(401).send({ msg: "Token mavjud emas!" });

    await pool.query(`update users set cover_img_url = $1 where id = $2`, [
      coverImages,
      userId,
    ]);

    res.status(201).send({ msg: "Cover images update!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const signOutUser = async (req, res) => {
  try {
    const { token } = req.headers;

    let verifyTokenUserId = token
      ? jwt.verify(token, process.env.SECRET_KEY).id
      : res.status(401).send({ msg: "Token mavjud emas!" });

    let userTable = await pool.query("select * from users where id = $1", [
      verifyTokenUserId,
    ]);

    if (!userTable.rows[0]) {
      return res.status(404).send({ msg: "User not found!" });
    }

    await pool.query(`update users set online = $1 where id = $2`, [
      false,
      verifyTokenUserId,
    ]);

    return res.status(201).send({ msg: "User sign out!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const postUser = async (req, res) => {
  try {
    const { title, token, img_url } = req.body;

    let userId = token
      ? jwt.verify(token, process.env.SECRET_KEY).id
      : res.status(401).send({ msg: "Token mavjud emas!" });

    let titleValidation =
      title.trim() === ""
        ? res.status(401).send({ msg: "title kiriting?" })
        : title.trim();

    await pool.query(
      `INSERT INTO post(title, img_url, user_id) VALUES($1,$2,$3)`,
      [titleValidation, img_url, userId]
    );

    return res.status(201).send({ msg: "Create post!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

const getPosts = async (req, res) => {
  try {
    let postList = await pool.query("select * from post");
    res.status(201).send(postList.rows);
  } catch {
    res.send({ msg: "Error" });
  }
};

export {
  getUsers,
  getUser,
  profelUserUpdate,
  coverImagesUpdate,
  signOutUser,
  postUser,
  getPosts,
};
