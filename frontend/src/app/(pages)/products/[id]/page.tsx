'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useStore from '@/lib/store';
import { CartIcon, HeartIcon } from '@/components/shared/icons';
import { IProduct } from '@/types/product.types';
import Link from 'next/link';

const ProductDetailPage = () => { 
  const params = useParams();
  const productId = parseInt(params.id as string, 10);
  
  // Get product data from store
  const product = useStore((state) => state.getProductById(productId));
  
  // Get all products from store for related products
  const allProducts = useStore((state) => state.products);
  
  // State for related products
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  
  // Get store functions
  const addToCart = useStore((state) => state.addToCart);
  const addToFavorites = useStore((state) => state.addToFavorites);
  
  // Local state for quantity
  const [quantity, setQuantity] = useState(1);
  
  // Image slider state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get random related products (excluding current product)
  useEffect(() => {
    if (allProducts.length > 0 && productId) {
      // Filter out the current product
      const otherProducts = allProducts.filter(p => p.id !== productId);
      
      // Shuffle array and take first 4 items
      const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffled.slice(0, 4));
    }
  }, [allProducts, productId]);
  
  // Handle quantity changes
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.countAvailable || 10)) {
      setQuantity(value);
    }
  };
  
  // Handle image navigation
  const nextImage = () => {
    if (product?.imagesUrl && product.imagesUrl.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.imagesUrl!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (product?.imagesUrl && product.imagesUrl.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.imagesUrl!.length - 1 : prevIndex - 1
      );
    }
  };
  
  // Handle thumbnail click
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  // Handle add to favorites
  const handleAddToFavorites = () => {
    if (product) {
      addToFavorites(product);
    }
  };
  
  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">Product Not Found</h1>
          <p className="text-neutral-600 mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <a 
            href="/products" 
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-300"
          >
            Back to Products
          </a>
        </div>
      </div>
    );
  }
  
  // Get images array or fallback to single image
  const images = product.imagesUrl && product.imagesUrl.length > 0 
    ? product.imagesUrl 
    : [product.image || 'https://placehold.co/600x400/F3F4F6/6B7280?text=Product+Image'];
  
  // Current image URL
  const currentImageUrl = images[currentImageIndex];
  
  // Check if product is on sale
  const isOnSale = product.salePrice !== null && product.salePrice < product.price;
  
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <a 
            href="/products" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Products
          </a>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image Slider */}
            <div className="md:w-1/2 p-6">
              <div className="relative w-full h-96 md:h-[500px] group">
                {/* Main Image */}
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={currentImageUrl}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${index === currentImageIndex ? 'border-amber-500' : 'border-gray-200'} hover:border-amber-300 transition-colors duration-200`}
                      aria-label={`Go to image ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        objectFit="cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="mb-4">
                {product.category && (
                  <span className="text-sm text-amber-600 font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                )}
                <h1 className="text-3xl font-bold text-neutral-800 mt-2">{product.name}</h1>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-5 h-5 ${i < 4 ? 'text-amber-500' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
                </div>
                
                <div className="mb-6">
                  {isOnSale ? (
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-amber-600">${product.salePrice?.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through ml-3">${product.price.toFixed(2)}</span>
                      <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        Save ${(product.price - (product.salePrice || 0)).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-amber-600">${product.price.toFixed(2)}</span>
                  )}
                </div>
                
                <p className="text-neutral-600 mb-6">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <span className="text-neutral-700 font-medium mr-3">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                      disabled={quantity >= (product.countAvailable || 10)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500 ml-3">
                    {product.countAvailable} available
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="cursor-pointer flex-1 min-w-[200px] bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center transform hover:scale-105"
                  >
                    <CartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={handleAddToFavorites}
                    className="cursor-pointer flex-1 min-w-[200px] border border-amber-600 text-amber-600 px-6 py-3 rounded-md hover:bg-amber-50 transition-colors duration-300 flex items-center justify-center transform hover:scale-105"
                  >
                    <HeartIcon className="h-5 w-5 mr-2" />
                    Add to Favorites
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-neutral-800 mb-3">Product Details</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex">
                    <span className="font-medium w-32">Category:</span>
                    <span>{product.category || 'N/A'}</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">In Stock:</span>
                    <span>{product.countAvailable} items available</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">SKU:</span>
                    <span>{product.id}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <Link href={`/products/${productId}`} className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={relatedProduct.imagesUrl && relatedProduct.imagesUrl.length > 0 ? relatedProduct.imagesUrl[0] : relatedProduct.image || 'https://placehold.co/600x400/F3F4F6/6B7280?text=Product+Image'}
                    alt={relatedProduct.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-neutral-800 mb-1 truncate" title={relatedProduct.name}>{relatedProduct.name}</h3>
                  <p className="text-amber-600 font-bold">
                    ${relatedProduct.salePrice && relatedProduct.salePrice < relatedProduct.price 
                      ? relatedProduct.salePrice.toFixed(2) 
                      : relatedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;