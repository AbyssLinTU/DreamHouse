'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IProduct } from '@/types/product.types';

interface CartItem extends IProduct {
  quantity: number;
}

interface CartFavoritesContextType {
  cartItems: CartItem[];
  favoriteItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
  addToFavorites: (product: IProduct) => void;
  removeFromFavorites: (productId: number) => void;
  getCartCount: () => number;
  getFavoritesCount: () => number;
}

const CartFavoritesContext = createContext<CartFavoritesContextType | undefined>(undefined);

export const CartFavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<IProduct[]>([]);

  const addToCart = (product: IProduct) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const addToFavorites = (product: IProduct) => {
    setFavoriteItems(prevItems => {
      const isFavorite = prevItems.some(item => item.id === product.id);
      if (isFavorite) {
        return prevItems.filter(item => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavoriteItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getFavoritesCount = () => {
    return favoriteItems.length;
  };

  return (
    <CartFavoritesContext.Provider
      value={{
        cartItems,
        favoriteItems,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
        getCartCount,
        getFavoritesCount,
      }}
    >
      {children}
    </CartFavoritesContext.Provider>
  );
};

export const useCartFavorites = () => {
  const context = useContext(CartFavoritesContext);
  if (context === undefined) {
    throw new Error('useCartFavorites must be used within a CartFavoritesProvider');
  }
  return context;
};
