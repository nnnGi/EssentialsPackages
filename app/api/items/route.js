import { NextResponse } from "next/server";
import { addItem, getItems } from "../../../lib/db";

// GET all items
export async function GET() {
	console.log("API route invoked");
	const items = await getItems();
	return NextResponse.json(items);
}

// POST a new item
export async function POST(req) {
	const { name } = await req.json();
	if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

	await addItem(name);
	return NextResponse.json({ success: true });
}
console.log("POSTGRES_URL:", process.env.POSTGRES_URL);