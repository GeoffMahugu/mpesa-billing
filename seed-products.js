const dotenv = require('dotenv');
dotenv.config({ path: './app/.env.local' });

const dbConnect = require('./app/lib/db');
const Product = require('./app/models/Product');

async function seedProducts() {
  await dbConnect();

  const products = [
    {
      name: 'Starter Pack',
      slug: 'starter-pack',
      description: 'Intro product',
      price: 500,
      currency: 'KES',
      stock: 50,
      images: ['/images/starter.jpg'],
      active: true,
    },
    {
      name: 'Pro Pack',
      slug: 'pro-pack',
      description: 'Advanced product',
      price: 1500,
      currency: 'KES',
      stock: 30,
      images: ['/images/pro.jpg'],
      active: true,
    },
  ];

  for (const product of products) {
    const existingProduct = await Product.findOne({ slug: product.slug });
    if (!existingProduct) {
      await Product.create(product);
      console.log(`Created product: ${product.name}`);
    } else {
      console.log(`Product already exists: ${product.name}`);
    }
  }

  console.log('Product seeding completed');
  process.exit(0);
}

seedProducts();
