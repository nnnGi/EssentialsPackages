import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// GET all items
export async function getItems() {
  const res = await pool.query("SELECT * FROM items ORDER BY id ASC");
  return res.rows;
}

// POST a new item
export async function addItem(name, rhid) {
  await pool.query(
    "INSERT INTO items (name, rhid) VALUES ($1, $2)",
    [name, rhid]
  );
}
