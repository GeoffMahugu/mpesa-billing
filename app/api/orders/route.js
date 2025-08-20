import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const query = session.user.role === 'admin' ? {} : { userId: session.user.id };
  const orders = await Order.find(query).sort('-createdAt');

  return NextResponse.json(orders);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const { productId, quantity } = await req.json();

  const product = await Product.findById(productId);
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  const total = product.price * quantity;

  const newOrder = new Order({
    userId: session.user.id,
    items: [{
      productId,
      name: product.name,
      unitPrice: product.price,
      qty: quantity,
      subtotal: total,
    }],
    total,
    currency: product.currency,
  });

  await newOrder.save();

  return NextResponse.json(newOrder, { status: 201 });
}
