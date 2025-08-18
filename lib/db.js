import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
	connectionString: process.env.POSTGRES_URL,
});

export async function addItem(name) {
	const client = await pool.connect();
	try {
		await client.query("INSERT INTO items (name) VALUES ($1)", [name]);
	} finally {
		client.release();
	}
}

export async function getItems() {
	const client = await pool.connect();
	try {
		const res = await client.query("SELECT * FROM items");
		return res.rows;
	} finally {
		client.release();
	}
}
