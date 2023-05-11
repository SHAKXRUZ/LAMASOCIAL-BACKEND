import pool from "../config/db_config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let userEmail = await pool.query("select * from users where email = $1", [
      email,
    ]);

    if (!userEmail.rows[0]) {
      return res.status(404).send({ msg: "Email not found!" });
    }

    let hashPassword = userEmail.rows[0].password;

    let userPassword = await bcrypt.compare(password, hashPassword);

    if (!userPassword) {
      return res.status(404).send({ msg: "Password error?" });
    }

    let userId = userEmail.rows[0].id;
    let user_Email = userEmail.rows[0].email;

    let token = await jwt.sign(
      { id: userId, email: user_Email },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_TIME,
      }
    );

    await pool.query(`update users set online = $1 where id = $2`, [
      true,
      userId,
    ]);

    res.status(201).send({ msg: "Success!", token });
  } catch {
    res.send({ msg: "Error" });
  }
};

export { loginUser };
