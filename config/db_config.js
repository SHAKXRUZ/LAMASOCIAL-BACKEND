import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "shakhruz",
  password: "20030625",
  port: 5432,
});

export default pool;
