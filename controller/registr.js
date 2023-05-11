import pool from "../config/db_config.js";
import bcrypt from "bcryptjs";
const registrUser = async (req, res) => {
  try {
    const { username, email, password, password_again, img_url } = req.body;

    let usernameValidation =
      username.trim() === ""
        ? res.status(401).send({ msg: "username kiriting?" })
        : username.trim();

    let passwordValidation = password === password_again;

    if (!passwordValidation) {
      return res
        .status(401)
        .send({ msg: "password is not equal to password!" });
    }

    let hashPassword = await bcrypt.hash(password, 12);

    let userEmail = await pool.query("select * from users where email = $1", [
      email,
    ]);

    if (userEmail.rows[0]) {
      return res.status(401).send({ msg: "This user is registered!" });
    }

    await pool.query(
      `INSERT INTO users(username, email, password, img_url) VALUES($1,$2,$3,$4)`,
      [usernameValidation, email, hashPassword, img_url]
    );

    return res.status(201).send({ msg: "Created users!" });
  } catch {
    res.send({ msg: "Error" });
  }
};

export { registrUser };
