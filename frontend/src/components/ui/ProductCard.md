# ProductCard Component Documentation

## Overview
The ProductCard component is a reusable UI element that displays product information in an attractive, responsive card format. It includes features like product images, pricing, ratings, and action buttons.

## Features
- Responsive design that works on all screen sizes
- Hover effects for better user interaction
- Sale price display with visual indicator
- Star rating system
- Category display
- Quick add to cart button
- Add to favorites button
- Accessible design with proper ARIA labels

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| product | IProduct | Yes | The product object containing all product information |
| onAddToCart | Function | No | Callback function triggered when the add to cart button is clicked |
| onAddToFavorites | Function | No | Callback function triggered when the add to favorites button is clicked |

## IProduct Interface

```typescript
interface IProduct {
  id: number | string
  name: string
  sale_price: number | null
  price: number
  quantity: number
  image: string
  imageUrl?: string
  description: string
  category?: string
}
```

## Usage Example

```tsx
import { ProductCard } from '@/components/ui/ProductCard';
import { IProduct } from '@/types/product.types';

const product: IProduct = {
  id: '1',
  name: 'Minimalist Vase "Serenity"',
  description: 'A modern ceramic vase designed to bring a sense of calm and elegance to any room.',
  price: 35.99,
  sale_price: null,
  quantity: 10,
  image: '',
  imageUrl: 'https://placehold.co/600x400/F3F4F6/6B7280?text=Vase+Serenity',
  category: 'Decor',
};

const handleAddToCart = (productId: string) => {
  console.log(`Product ${productId} added to cart!`);
  // Add your cart logic here
};

const handleAddToFavorites = (productId: string) => {
  console.log(`Product ${productId} added to favorites!`);
  // Add your favorites logic here
};

<ProductCard 
  product={product}
  onAddToCart={handleAddToCart}
  onAddToFavorites={handleAddToFavorites}
/>
```

## Customization

The ProductCard component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. Modifying the existing Tailwind classes
2. Adding additional CSS classes
3. Overriding styles in your global CSS file

## Accessibility

The component includes proper accessibility features:
- ARIA labels for interactive elements
- Proper contrast ratios for text
- Semantic HTML structure
- Keyboard navigable elements

## Best Practices

1. Always provide both `image` and `imageUrl` properties (one can be empty string)
2. Use descriptive product names and descriptions
3. Implement proper error handling in the callback functions
4. Ensure product images are optimized for web use
5. Test the component on different screen sizes

## Integration with State Management

In a real application, you would connect the callback functions to your state management system:

```tsx
// With Redux
const handleAddToCart = (productId: string) => {
  dispatch(addToCart(productId));
};

// With Context API
const handleAddToFavorites = (productId: string) => {
  favoritesContext.addToFavorites(productId);
};
```
