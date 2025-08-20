import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit')) || 10;
  const page = parseInt(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || '-createdAt';

  const query = q ? { name: { $regex: q, $options: 'i' } } : {};

  const products = await Product.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(sort);

  const total = await Product.countDocuments(query);

  return NextResponse.json({
    items: products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const body = await req.json();
  const newProduct = new Product(body);
  await newProduct.save();

  return NextResponse.json(newProduct, { status: 201 });
}
