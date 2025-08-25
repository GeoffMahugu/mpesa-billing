'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        try {
          const res = await fetch(`/api/products/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error(error);
          // Handle error state here, e.g., show a toast message
        } finally {
          setLoading(false);
        }
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-off-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-64 h-64 bg-neutral-gray-light rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-off-white flex items-center justify-center">
        <p className="text-neutral-dark">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-off-white">
      <header className="bg-neutral-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">{product.name}</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image src={product.images[0]} alt={product.name} width={800} height={600} className="w-full h-auto object-cover rounded-lg shadow-card" />
            {/* Placeholder for 3D view */}
            <div className="mt-8 w-full h-64 bg-neutral-gray-light rounded-lg flex items-center justify-center">
              <p className="text-neutral-dark">3D View Placeholder</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-neutral-dark">{product.name}</h2>
            <p className="text-2xl text-primary font-bold mt-2">{product.currency} {product.price}</p>
            <p className="mt-4 text-neutral-dark">{product.description}</p>
            <div className="mt-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.stock > 0 ? 'bg-success text-neutral-white' : 'bg-error text-neutral-white'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            <button
              className="mt-8 w-full py-3 text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={product.stock === 0}
            >
              Buy Now (STK Push)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
