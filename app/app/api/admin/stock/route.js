import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDB } from "@/lib/db"
import Product from "@/models/Product"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.role === 'admin') {
      return new Response(
        JSON.stringify({ ok: false, code: 'FORBIDDEN', message: 'Admin access required' }),
        { status: 403 }
      )
    }

    await connectToDB()

    const products = await Product.find({ active: true })
      .select('name stock price active')
      .lean()

    const inventorySummary = {
      totalProducts: products.length,
      totalStock: products.reduce((sum, p) => sum + p.stock, 0),
      lowStock: products.filter(p => p.stock < 10).length,
      outOfStock: products.filter(p => p.stock === 0).length,
      products
    }

    return new Response(
      JSON.stringify(inventorySummary),
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to get inventory summary:', error)
    return new Response(
      JSON.stringify({ ok: false, code: 'SERVER_ERROR', message: 'Failed to get inventory data' }),
      { status: 500 }
    )
  }
}
