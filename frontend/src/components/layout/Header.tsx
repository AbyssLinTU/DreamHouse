'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import useStore from '@/lib/store';
import { SearchIcon, CartIcon, HeartIcon, StarIcon, UserIcon, CloseIcon } from '@/components/shared/icons';

export const Header = () => {
  const cartCount = useStore((state) => state.getCartCount());
  const favoritesCount = useStore((state) => state.getFavoritesCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex w-full py-6 px-4 sm:px-8 lg:px-12 justify-between items-center border-b border-neutral-200">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-neutral-900">
            DREAMHOUSE
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="flex items-center space-x-8">
          <Link href="/products" className="text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            SHOP
          </Link>
          <Link href="/about" className="text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            ABOUT
          </Link>
          <Link href="/contact" className="text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            CONTACT US
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="cursor-pointer text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            <SearchIcon className="h-6 w-6" />
          </button>

          {/* Cart Icon */}
          <Link href="/cart" className="text-neutral-700 hover:text-amber-600 transition-colors duration-300 relative">
            <CartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Favorites Icon */}
          <Link href="/favorites" className="text-neutral-700 hover:text-amber-600 transition-colors duration-300 relative">
            <HeartIcon className="h-6 w-6" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Reviews Icon */}
          <Link href="/reviews" className="cursor-pointer text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            <StarIcon className="h-6 w-6" />
          </Link>

          {/* Profile Icon */}
          <Link href="/profile" className="cursor-pointer text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            <UserIcon className="h-6 w-6" />
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden w-full py-4 px-4 flex justify-between items-center border-b border-neutral-200">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight text-neutral-900">
            DREAMHOUSE
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Search Icon */}
          <button className="cursor-pointer text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            <SearchIcon className="h-6 w-6" />
          </button>

          {/* Menu Toggle Button */}
          <button 
            className="cursor-pointer text-neutral-700 hover:text-amber-600 transition-colors duration-300"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out" onClick={closeMenu}>
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0" onClick={(e) => e.stopPropagation()}>
            {/* Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900 animate-fadeIn">Menu</h2>
              <button 
                className="cursor-pointer text-neutral-700 hover:text-amber-600 transition-colors duration-300 transform hover:scale-110"
                onClick={closeMenu}
              >
                <CloseIcon className="h-6 w-6 transition-transform duration-200" />
              </button>
            </div>
            
            {/* Menu Items */}
            <nav className="flex flex-col p-4 space-y-4 animate-slideInRight">
              <Link href="/products" className="text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors duration-300 py-2 transform hover:translate-x-2" onClick={closeMenu}>
                SHOP
              </Link>
              <Link href="/about" className="text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors duration-300 py-2 transform hover:translate-x-2" onClick={closeMenu}>
                ABOUT
              </Link>
              <Link href="/contact" className="text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors duration-300 py-2 transform hover:translate-x-2" onClick={closeMenu}>
                CONTACT US
              </Link>
              <Link href="/cart" className="text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors duration-300 py-2 flex items-center transform hover:translate-x-2" onClick={closeMenu}>
                CART
                {cartCount > 0 && (
                  <span className="ml-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/favorites" className="text-lg font-medium text-neutral-700 hover:text-amber-600 transition-colors duration-300 py-2 flex items-center transform hover:translate-x-2" onClick={closeMenu}>
                FAVORITES
                {favoritesCount > 0 && (
                  <span className="ml-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-40">
        <div className="flex justify-around items-center py-3">
          <Link href="/" className="flex flex-col items-center text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link href="/cart" className="flex flex-col items-center text-neutral-700 hover:text-amber-600 transition-colors duration-300 relative">
            <CartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </Link>
          
          <Link href="/favorites" className="flex flex-col items-center text-neutral-700 hover:text-amber-600 transition-colors duration-300 relative">
            <HeartIcon className="h-6 w-6" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
            <span className="text-xs mt-1">Favorites</span>
          </Link>
          
          <Link href="/profile" className="flex flex-col items-center text-neutral-700 hover:text-amber-600 transition-colors duration-300">
            <UserIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};
