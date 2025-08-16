'use client';

import React from 'react';
import Image from 'next/image';
import useStore from '@/lib/store';
import { CartIcon, MinusIcon, PlusIcon, CloseIcon } from '@/components/shared/icons';
import Link from 'next/link';

const CartPage = () => {
  // Get cart items and store functions from Zustand
  const cartItems = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const getCartCount = useStore((state) => state.getCartCount);
  const clearCart = useStore((state) => state.clearCart);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.salePrice && item.salePrice < item.price ? item.salePrice : item.price;
    return total + (price * item.quantity);
  }, 0);
  
  const shipping = subtotal > 0 ? 5.99 : 0; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  // Get addToCart function from store
  const addToCart = useStore((state) => state.addToCart);
  
  // Handle quantity changes
  const handleDecreaseQuantity = (productId: number) => {
    removeFromCart(productId);
  };
  
  const handleIncreaseQuantity = (product: any) => {
    addToCart(product, 1);
  };
  
  // Handle checkout
  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    // In a real implementation, this would redirect to a checkout page
  };
  
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-800 mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          // Empty cart state
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-6">
              <CartIcon className="h-12 w-12 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Your cart is empty</h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our products and find something you love!</p>
            <Link href="/products" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors duration-300 transform hover:scale-105">
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-neutral-800">Cart ({getCartCount()} items)</h2>
                  <button 
                    onClick={clearCart}
                    className="text-amber-600 hover:text-amber-700 transition-colors duration-300 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
                    const isOnSale = item.salePrice !== null && item.salePrice < item.price;
                    const itemPrice : number = isOnSale ? item.salePrice! : item.price;
                    const itemTotal = itemPrice * item.quantity;
                    
                    return (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
                        {/* Product image */}
                        <div className="relative w-full sm:w-32 h-40 flex-shrink-0">
                          <Image
                            src={item.imagesUrl?.[0] || item.image || 'https://placehold.co/600x400/F3F4F6/6B7280?text=Product+Image'}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                        
                        {/* Product details */}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-neutral-800 mb-1">{item.name}</h3>
                              <p className="text-sm text-gray-500 mb-2">{item.category || 'Category'}</p>
                              <div className="flex items-center mb-3">
                                <span className="text-lg font-bold text-amber-600">${itemPrice?.toFixed(2)}</span>
                                {isOnSale && (
                                  <span className="text-sm text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
                                )}
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <CloseIcon className="h-5 w-5" />
                            </button>
                          </div>
                          
                          {/* Quantity controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button 
                                onClick={() => handleDecreaseQuantity(item.id)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <MinusIcon className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 w-12 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => handleIncreaseQuantity(item)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <PlusIcon className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="text-lg font-bold text-neutral-800">${itemTotal.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <Link href="/products" className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-300 mb-8">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Continue Shopping
              </Link>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-neutral-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition-colors duration-300 transform hover:scale-[1.02] font-medium"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Free shipping on orders over $50</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;