"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form'; 
import { IRegister } from '@/types/auth.types';
import useRegister from '@/hooks/auth/useRegister';
// Password strength levels
const PASSWORD_STRENGTH = {
  WEAK: 0,
  FAIR: 1,
  GOOD: 2,
  STRONG: 3
};

// Password strength labels
const PASSWORD_LABELS = [
  'Very Weak',
  'Weak',
  'Fair',
  'Good',
  'Strong'
];

// Password strength colors
const PASSWORD_COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-blue-500',
  'bg-green-500'
];

export default function RegisterPage() {
  const router = useRouter();
  const {mutate}=useRegister();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    
  } = useForm<IRegister & { confirmPassword: string }>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength += 1; 
    if (/[A-Z]/.test(password)) strength += 1; // uppercase
    if (/[0-9]/.test(password)) strength += 1; // numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 1; // special characters
    
    // Determine strength level (0-4)
    if (strength <= 2) return 0; // Very Weak
    if (strength <= 3) return 1; // Weak
    if (strength <= 4) return 2; // Fair
    if (strength <= 5) return 3; // Good
    return 4; // Strong
  };

  
  const onSubmit = async (data: IRegister) => {
    try {
      mutate(data);
      router.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get password strength
  const passwordStrength = calculatePasswordStrength(password);
  
  // Get password strength width (0-100%)
  const passwordStrengthWidth = (passwordStrength / 4) * 100;

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-amber-600 hover:text-amber-500">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <input
                    {...field}
                    id="name"
                    type="text"
                    autoComplete="name"
                    className={`appearance-none relative block w-full px-3 py-3 border ${fieldState.error ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                    placeholder="John Doe"
                  />
                )}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`appearance-none relative block w-full px-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                    placeholder="email@example.com"
                  />
                )}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      field.onChange(e);
                      setPassword(e.target.value);
                    }}
                    className={`appearance-none relative block w-full px-3 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                    placeholder="Password"
                  />
                )}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              
              {/* Password strength indicator */}
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">Password Strength</span>
                  <span className={`text-xs font-medium ${passwordStrength >= 3 ? 'text-green-600' : passwordStrength >= 2 ? 'text-blue-600' : 'text-red-600'}`}>
                    {PASSWORD_LABELS[passwordStrength]}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${PASSWORD_COLORS[passwordStrength]}`}
                    style={{ width: `${passwordStrengthWidth}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Use at least 6 characters with a mix of letters, numbers, and symbols
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className={`appearance-none relative block w-full px-3 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm`}
                    placeholder="Confirm Password"
                  />
                )}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
