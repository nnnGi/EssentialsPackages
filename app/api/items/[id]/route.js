import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET /api/items/:id
export async function GET(req, { params }) {
  const { id } = params;
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(result.rows[0]);
}

// PUT /api/items/:id
export async function PUT(req, { params }) {
  const { id } = params;
  const { name, description } = await req.json();
  if (!name || !description) {
    return NextResponse.json({ error: "Name and description required" }, { status: 400 });
  }

  const result = await pool.query(
    "UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(result.rows[0]);
}

// DELETE /api/items/:id
export async function DELETE(req, { params }) {
  const { id } = params;
  const result = await pool.query("DELETE FROM items WHERE id = $1 RETURNING *", [id]);
  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, deleted: result.rows[0] });
}
