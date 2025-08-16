'use client';

import React from 'react';
import Image from 'next/image';
import useStore from '@/lib/store';
import { CartIcon } from '@/components/shared/icons';
import Link from 'next/link';
import { IProduct } from '@/types/product.types';

const FavoritesPage = () => {
  // Get favorites and store functions from Zustand
  const favoriteItems = useStore((state) => state.favorites);
  const removeFromFavorites = useStore((state) => state.removeFromFavorites);
  const addToCart = useStore((state) => state.addToCart);
  
  // Handle add to cart
  const handleAddToCart = (product: IProduct) => {
    addToCart(product, 1);
  };
  
  // Handle remove from favorites
  // const handleRemoveFromFavorites = (productId: number) => {
  //   removeFromFavorites(productId);
  // };
  
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Your Favorites</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {favoriteItems.length > 0 
              ? 'Your favorite products are listed below. Add them to your cart when you\'re ready!'
              : 'You haven\'t added any products to your favorites yet.'}
          </p>
        </div>
        
        {favoriteItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="inline-block p-4 bg-amber-50 rounded-full">
                <svg 
                  className="w-16 h-16 text-amber-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">No Favorites Yet</h2>
            <p className="text-neutral-600 mb-6">
              Start adding products to your favorites to see them here.
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-neutral-600">
                Showing <span className="font-semibold">{favoriteItems.length}</span> favorite {favoriteItems.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteItems.map((item) => {
                // Determine which image URL to use
                const imageUrl = item.imagesUrl?.[0] || item.image || 'https://placehold.co/600x400/F3F4F6/6B7280?text=Product+Image';
                
                // Check if product is on sale
                const isOnSale = item.salePrice !== null && item.salePrice < item.price;
                
                // Determine price to display
                const displayPrice = isOnSale ? item.salePrice : item.price;
                
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    {/* Product Image */}
                    <div className="relative w-full h-48">
                      <Image
                        src={imageUrl}
                        alt={item.name}
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
                      
                      {/* Remove from Favorites Button */}
                      <button
                        onClick={() => removeFromFavorites(Number(item.id))}
                        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md text-neutral-700 hover:bg-red-100 hover:text-red-600 transition-all duration-300 flex items-center justify-center"
                        title="Remove from Favorites"
                        aria-label={`Remove ${item.name} from favorites`}
                      >
                        <svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12" 
                          />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Product Details */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Category */}
                      {item.category && (
                        <span className="text-xs text-amber-600 font-medium uppercase tracking-wide mb-1">
                          {item.category}
                        </span>
                      )}
                      
                      {/* Product Name */}
                      <h3 
                        className="text-lg font-semibold text-neutral-800 mb-2 truncate" 
                        title={item.name}
                      >
                        {item.name}
                      </h3>
                      
                      {/* Price */}
                      <div className="flex justify-between items-center mt-auto mb-4">
                        <div className="flex flex-col">
                          {isOnSale ? (
                            <>
                              <span className="text-xl font-bold text-amber-600">${displayPrice?.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through">${item.price.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-amber-600">${displayPrice?.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center"
                      >
                        <CartIcon className="h-5 w-5 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/products" 
                className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;