import pool from "../config/db_config.js";
import jwt from "jsonwebtoken";
const laykPost = async (req, res) => {
  try {
    const { tokenes, post } = req.body;

    let userId = jwt.verify(tokenes, process.env.SECRET_KEY).id;

    let laykUser = await pool.query("select * from layk where user_id = $1", [
      userId,
    ]);

    let postId = await pool.query("select * from layk where post_id = $1", [
      post,
    ]);

    if (laykUser.rows[0] || postId.rows[0]) {
      return await pool.query(
        `INSERT INTO layk(user_id, post_id) VALUES($1,$2)`,
        [userId, post]
      );
    }

    // await pool.query(`update layk set islike = $1 where id = $2`, [
    //   false,
    //   post,
    // ]);

    return res.status(201).send({ msg: "Post like!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

export { laykPost };
