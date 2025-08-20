'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.items);
      } catch (error) {
        console.error(error);
        // Handle error state here, e.g., show a toast message
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-off-white">
      <header className="bg-neutral-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Products</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {/* Add filter and sort dropdowns here */}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-neutral-white rounded-lg shadow-card animate-pulse">
                <div className="w-full h-48 bg-neutral-gray-light rounded-t-lg"></div>
                <div className="p-4 space-y-2">
                  <div className="w-3/4 h-6 bg-neutral-gray-light rounded"></div>
                  <div className="w-1/2 h-6 bg-neutral-gray-light rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="bg-neutral-white rounded-lg shadow-card hover:shadow-hover transition-shadow duration-300">
                  <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-neutral-dark">{product.name}</h3>
                    <p className="text-primary font-bold">{product.currency} {product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
