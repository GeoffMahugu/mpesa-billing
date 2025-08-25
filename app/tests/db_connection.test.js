require('dotenv').config({ path: './.env.local' });
const dbConnect = require('./lib/db').default;
const ProductModel = require('./models/Product');

async function test() {
  const conn = await dbConnect();
  console.log("Database connection state:", conn.connection.readyState);
  console.log("Database name:", conn.connection.db.databaseName);
  const products = await conn.connection.db.collection('products').find().limit(10).toArray();
  console.log("Products found:", products);
  console.log("Collection names:", await conn.connection.db.listCollections().toArray());
}

test();
