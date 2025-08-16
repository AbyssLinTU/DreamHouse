'use client';
import React, { useState, useEffect } from 'react';
import useStore from '@/lib/store';
import useGetProducts from '@/hooks/products/useGetProducts';
import useCreateProduct from '@/hooks/products/useCreateProduct';
import useRemoveProduct from '@/hooks/products/useRemoveProduct';

const AdminContent = () => {
    const { data: products = [], isLoading, error } = useGetProducts();
    const addProduct = useStore((state) => state.addProduct);
    const setStoreProducts = useStore((state) => state.setProducts);
    const getSalesData = useStore((state) => state.getSalesData);
    const getSalesStats = useStore((state) => state.getSalesStats);
    
    // Sync products with the store
    useEffect(() => {
      if (products.length > 0) {
        setStoreProducts(products);
      }
    }, [products, setStoreProducts]);
    
    // Product mutation hooks
    const createProductMutation = useCreateProduct();
    const removeProductMutation = useRemoveProduct();
    
    // State for form inputs
    const [newProduct, setNewProduct] = useState({
      id: 0,
      name: '',
      description: '',
      price: 0,
      salePrice: null as number | null,
      countAvailable: 0,
      imagesUrl: [] as string[],
      category: '',
    });
    
    // State for editing
    const [editingId, setEditingId] = useState<string | null>(null);
    
    // Get sales data
    const salesData = getSalesData();
    const salesStats = getSalesStats();
    
    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      if (name === 'imagesUrl') {
        // Handle imagesUrl as a comma-separated string that gets converted to an array
        setNewProduct({
          ...newProduct,
          [name]: value.split(',').map(url => url.trim()).filter(url => url.length > 0)
        });
      } else {
        setNewProduct({
          ...newProduct,
          [name]: name === 'price' || name === 'salePrice' || name === 'countAvailable' 
            ? value === '' ? (name === 'salePrice' ? null : 0) : Number(value)
            : value
        });
      }
    };
    
    // Handle form submission for adding a new product
    const handleAddProduct = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Map form data to match IProductDto interface
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        salePrice: newProduct.salePrice,
        countAvailable: newProduct.countAvailable,
        imagesUrl: newProduct.imagesUrl.length > 0 ? newProduct.imagesUrl : undefined,
        category: newProduct.category || undefined,
      };
      
      // Create the product
      createProductMutation.mutate(productData);
      
      // Reset form
      setNewProduct({
        id: 0,
        name: '',
        description: '',
        price: 0,
        salePrice: null,
        countAvailable: 0,
        imagesUrl: [],
        category: '',
      });
    };
    
    // Handle removing a product
    const handleRemoveProduct = (productId: number) => {
      removeProductMutation.mutate(productId);
    };
    
    // Custom bar chart component
    const BarChart = () => {
      // Find max value for scaling
      const maxValue = Math.max(...salesData.map(item => item.amount), 0);
      
      return (
        <div className="w-full h-64 flex items-end space-x-2 pt-4">
          {salesData.map((item, index) => {
            // Calculate height as a percentage of the max value, with a minimum height
            const heightPercentage = maxValue > 0 ? (item.amount / maxValue) * 80 + 10 : 10;
            return (
              <div key={index} className="flex flex-col items-center" style={{ width: `${100 / salesData.length}%` }}>
                <div className="flex flex-col items-center w-full">
                  <div className="text-xs text-neutral-600 mb-1">${item.amount}</div>
                  <div 
                    className="w-full bg-amber-500 rounded-t hover:bg-amber-600 transition-colors duration-300"
                    style={{ height: `${heightPercentage}%`, minHeight: '20px' }}
                  />
                </div>
                <div className="text-xs text-neutral-600 mt-2 text-center">
                  {item.date.split('-')[1]}/{item.date.split('-')[0].slice(2)}
                </div>
              </div>
            );
          })}
        </div>
      );
    };
    
    return (
      <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Manage your products and view sales analytics
            </p>
          </div>
          
          {/* Sales Analytics Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Sales Analytics</h2>
            
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="text-amber-800 text-sm font-medium">Total Sales</div>
                <div className="text-2xl font-bold text-neutral-900">${salesStats.totalSales.toFixed(2)}</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="text-amber-800 text-sm font-medium">Total Orders</div>
                <div className="text-2xl font-bold text-neutral-900">{salesStats.totalOrders}</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="text-amber-800 text-sm font-medium">Avg Order Value</div>
                <div className="text-2xl font-bold text-neutral-900">${salesStats.avgOrderValue.toFixed(2)}</div>
              </div>
            </div>
            
            {/* Chart */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Monthly Sales</h3>
              <div className="h-64">
                <BarChart />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Product Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Add New Product</h2>
              <form onSubmit={handleAddProduct}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="salePrice" className="block text-sm font-medium text-neutral-700 mb-1">Sale Price ($) (optional)</label>
                      <input
                        type="number"
                        id="salePrice"
                        name="salePrice"
                        value={newProduct.salePrice || ''}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="None"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="countAvailable" className="block text-sm font-medium text-neutral-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        id="countAvailable"
                        name="countAvailable"
                        value={newProduct.countAvailable}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="imagesUrl" className="block text-sm font-medium text-neutral-700 mb-1">Image URLs (comma separated)</label>
                    <input
                      type="text"
                      id="imagesUrl"
                      name="imagesUrl"
                      value={newProduct.imagesUrl.join(', ')}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={createProductMutation.isPending}
                    className="w-full bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors duration-300 disabled:opacity-50"
                  >
                    {createProductMutation.isPending ? 'Adding...' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Products List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Manage Products</h2>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-neutral-600">Loading products...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">Error loading products. Please try again later.</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-neutral-600">No products available. Add your first product!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-800">{product.name}</h3>
                          <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{product.description}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-amber-600 font-bold">${product.price.toFixed(2)}</span>
                            {product.salePrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">${product.salePrice.toFixed(2)}</span>
                            )}
                            <span className="text-sm text-neutral-500 ml-3">Qty: {product.countAvailable}</span>
                          </div>
                          <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded mt-2">
                            {product.category}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveProduct(product.id)}
                          disabled={removeProductMutation.isPending}
                          className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-300 disabled:opacity-50"
                          aria-label={`Remove ${product.name}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
export default AdminContent;