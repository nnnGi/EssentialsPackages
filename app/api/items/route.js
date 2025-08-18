import { NextResponse } from "next/server";
import { addItem, getItems } from "../../../lib/db";

// GET all items
export async function GET() {
  const items = await getItems();
  return NextResponse.json(items);
}

// POST a new item with name + description
export async function POST(req) {
  const { name, rhid } = await req.json();

  if (!name || !rhid) {
    return NextResponse.json(
      { error: "Name and rhid required" },
      { status: 400 }
    );
  }

  await addItem(name, rhid);
  return NextResponse.json({ success: true });
}