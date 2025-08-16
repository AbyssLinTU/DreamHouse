'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/types/product.types';
import useStore from '@/lib/store';
import { CartIcon, HeartIcon } from '@/components/shared/icons';
import Link from 'next/link';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Determine which image URL to use
  const imageUrl = product.imagesUrl?.[0] || product.image || 'https://placehold.co/600x400/F3F4F6/6B7280?text=Product+Image';
  
  
  const isOnSale = product.salePrice !== null && product.salePrice < product.price;
  
  // Get store functions
  const addToCart = useStore((state) => state.addToCart);
  const addToFavorites = useStore((state) => state.addToFavorites);
  const removeFromFavorites = useStore((state) => state.removeFromFavorites);
  // Subscribe to favorites array to trigger re-renders when it changes
  const favorites = useStore((state) => state.favorites);
  // Compute favorite status locally based on the favorites array
  const isProductFavorite = favorites.some((item) => item.id === product.id);
  
  // Generate deterministic star rating based on product ID (for demo purposes - in a real app this would come from product data)
  const generateRating = () => {
    // Create a pseudo-random rating based on product ID to ensure consistency between server and client
    const seed = product.id;
    const rating = 4 + (seed % 2); // Rating between 4-5 for demo
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-amber-500' : 'text-gray-300'}`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <Link href={`/products/${product.id}`} className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden relative group transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl border border-gray-100 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative w-full h-56 md:h-64">
        <Image
          src={imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        
        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
        
        {/* Action Buttons (appear on hover) */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="cursor-pointer bg-white rounded-full p-4 shadow-md text-neutral-700 hover:bg-amber-100 hover:text-amber-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            title="Add to Cart"
            aria-label={`Add ${product.name} to cart`}
          >
            <CartIcon className="h-6 w-6 transition-all duration-300 transform" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isProductFavorite) {
                removeFromFavorites(product.id);
              } else {
                addToFavorites(product);
              }
            }}
            className="cursor-pointer bg-white rounded-full p-4 shadow-md text-neutral-700 hover:bg-amber-100 hover:text-amber-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            title={isProductFavorite ? "Remove from Favorites" : "Add to Favorites"}
            aria-label={isProductFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          >
            <HeartIcon 
              className="h-6 w-6 transition-all duration-300 transform group-hover:scale-110" 
              isFilled={isProductFavorite}
            />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">
            {product.category}
          </span>
        )}
        
        {/* Product Name */}
        <h3 
          className="text-lg font-semibold text-neutral-800 mb-2 truncate" 
          title={product.name}
        >
          {product.name}
        </h3>
        <div className="flex flex-row justify-between">
        
        {/* Price */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            {isOnSale ? (
              <>
                <span className="text-xl font-bold text-amber-600">${product.salePrice?.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-amber-600">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
         {/* Rating */}
         <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {generateRating()}
          </div>
          <span className="text-xs text-gray-500">(12)</span>
        </div>
        </div>
      </div>
    </Link>
  );
};
