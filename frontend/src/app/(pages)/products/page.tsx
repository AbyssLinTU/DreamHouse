'use client'
import { ProductCard } from '@/components/ui/ProductCard';
import React, { useEffect } from 'react';
import { IProduct } from '@/types/product.types';
import useGetProducts from '@/hooks/products/useGetProducts';
import useStore from '@/lib/store';

// Remove the dummy product data since we're now fetching from the API

export default function ShopPage() {
  const { data: products = [], isLoading, error } = useGetProducts();
  const setStoreProducts = useStore((state) => state.setProducts);
  
  // Sync products with the store
  useEffect(() => {
    if (products.length > 0) {
      setStoreProducts(products);
    }
  }, [products, setStoreProducts]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans flex flex-col">
        <main className="flex-1 p-4 sm:p-8 lg:p-12 flex items-center justify-center">
          <p className="text-lg text-neutral-600">Loading products...</p>
        </main>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans flex flex-col">
        <main className="flex-1 p-4 sm:p-8 lg:p-12 flex items-center justify-center">
          <p className="text-lg text-red-600">Error loading products. Please try again later.</p>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans flex flex-col">

      <main className="flex-1 p-4 sm:p-8 lg:p-12">
        <section className="text-center mb-16 mt-8 w-full max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-neutral-900">
            OUR COLLECTION
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Explore our curated selection of home goods designed to elevate your living space.
          </p>
        </section>

        <section className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>
      </main>

    </div>
  );
}
