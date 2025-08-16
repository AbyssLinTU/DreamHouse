import { IProduct } from "@/types/product.types";
import { create } from "zustand";

interface CartItem extends IProduct {
  quantity: number;
}

interface AddToCartOptions {
  product: IProduct;
  quantity?: number;
}

interface StoreState {
  cart: CartItem[];
  favorites: IProduct[];
  products: IProduct[];
  salesData: { date: string; amount: number }[];

  addToCart: (product: IProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartCount: () => number;

  addToFavorites: (product: IProduct) => void;
  removeFromFavorites: (productId: number) => void;
  getFavoritesCount: () => number;
  isFavorite: (productId: number) => boolean;

  getProductById: (id: number) => IProduct | undefined;
  
  // Admin functions
  addProduct: (product: IProduct) => void;
  removeProduct: (productId: number) => void;
  updateProduct: (productId: number, updates: Partial<IProduct>) => void;
  
  // Product data sync functions
  setProducts: (products: IProduct[]) => void;
  
  getSalesData: () => { date: string; amount: number }[];
  getSalesStats: () => { totalSales: number; totalOrders: number; avgOrderValue: number };
}


// Mock sales data
const mockSalesData = [
  { date: '2023-01-01', amount: 1200 },
  { date: '2023-02-01', amount: 1900 },
  { date: '2023-03-01', amount: 1500 },
  { date: '2023-04-01', amount: 2200 },
  { date: '2023-05-01', amount: 1800 },
  { date: '2023-06-01', amount: 2500 },
];

const useStore = create<StoreState>((set, get) => ({
  cart: [],
  favorites: [],
  products: [],
  salesData: mockSalesData,

  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // If item doesn't exist, add it with the specified quantity
        return {
          cart: [...state.cart, { ...product, quantity }],
        };
      }
    }),

  removeFromCart: (productId: number) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return {
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          cart: state.cart.filter((item) => item.id !== productId),
        };
      }
    }),

  clearCart: () => set({ cart: [] }),

  getCartCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  addToFavorites: (product) =>
    set((state) => {
      const isAlreadyFavorite = state.favorites.some((item) => item.id === product.id);
      if (!isAlreadyFavorite) {
        return {
          favorites: [...state.favorites, product],
        };
      }
      return state;
    }),

  removeFromFavorites: (productId: number) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== productId),
    })),

  getFavoritesCount: () => {
    return get().favorites.length;
  },

  isFavorite: (productId: number) => {
    return get().favorites.some((item) => item.id === productId);
  },

  getProductById: (id: number) => {
    return get().products.find(product => product.id === id);
  },
  
  // Admin functions
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  
  updateProduct: (productId, updates) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, ...updates } : product
      ),
    })),
  
  // Product data sync functions
  setProducts: (products) =>
    set({ products }),
  
  getSalesData: () => {
    return get().salesData;
  },
  
  getSalesStats: () => {
    const salesData = get().salesData;
    const totalSales = salesData.reduce((sum, data) => sum + data.amount, 0);
    const totalOrders = salesData.length;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    
    return {
      totalSales,
      totalOrders,
      avgOrderValue,
    };
  }
}));

export default useStore;
