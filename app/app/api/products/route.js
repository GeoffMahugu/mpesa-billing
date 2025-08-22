import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req) {
  console.log("GET /api/products called");
  const conn = await dbConnect();
  console.log("Database connection state:", conn.connection.readyState);

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit")) || 10;

  console.log("Limit:", limit);

  const products = await Product.find()
    .limit(limit);

  console.log("Products found:", products);

  return NextResponse.json(products);
}

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const newProduct = new Product(body);
  await newProduct.save();

  return NextResponse.json(newProduct, { status: 201 });
}
