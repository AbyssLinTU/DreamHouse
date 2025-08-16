'use client';

import React, { useState } from 'react';
import useStore from '@/lib/store';

const ProfilePage = () => {
  // Get user data from store (in a real app, this would come from authentication)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });
  
  const favoritesCount = useStore((state) => state.getFavoritesCount());
  const cartCount = useStore((state) => state.getCartCount());
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    alert('Profile updated successfully!');
  };
  
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-800 font-sans py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">My Profile</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Manage your account information and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="text-center">
                <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4" />
                <h2 className="text-xl font-bold text-neutral-800">{userData.name}</h2>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-neutral-600">Favorites</span>
                    <span className="font-bold text-amber-600">{favoritesCount}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-neutral-600">Cart Items</span>
                    <span className="font-bold text-amber-600">{cartCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Personal Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="cursor-pointer bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Security</h2>
              <div className="space-y-4">
                <div>
                  <button className="cursor-pointer text-amber-600 hover:text-amber-700 transition-colors duration-300 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Change Password
                  </button>
                </div>
                <div>
                  <button className="cursor-pointer text-amber-600 hover:text-amber-700 transition-colors duration-300 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;