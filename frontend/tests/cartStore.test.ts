import { act, renderHook } from '@testing-library/react';
import { useCartStore } from '../src/store/cartStore';
import { Product } from '../src/types';

describe('useCartStore', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    image_url: 'https://example.com/image.jpg',
    stock: 10,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    // Clear the store before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
  });

  describe('addToCart', () => {
    it('should add a new item to cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product.id).toBe(mockProduct.id);
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('should increment quantity if item already in cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct, 1);
        result.current.addToCart(mockProduct, 2);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });

    it('should handle adding with default quantity of 1', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeFromCart(mockProduct.id);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should not affect cart if product not found', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct, 1);
        result.current.removeFromCart(999);
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct, 1);
        result.current.updateQuantity(mockProduct.id, 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('should remove item if quantity is 0 or negative', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct, 5);
        result.current.updateQuantity(mockProduct.id, 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should handle negative quantity by removing item', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addToCart(mockProduct, 5);
        result.current.updateQuantity(mockProduct.id, -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { result } = renderHook(() => useCartStore());

      const product2 = { ...mockProduct, id: 2, name: 'Product 2' };

      act(() => {
        result.current.addToCart(mockProduct, 1);
        result.current.addToCart(product2, 1);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('getTotal', () => {
    it('should calculate total price correctly', () => {
      const { result } = renderHook(() => useCartStore());

      const product2 = { ...mockProduct, id: 2, name: 'Product 2', price: 50 };

      act(() => {
        result.current.addToCart(mockProduct, 2); // 99.99 * 2 = 199.98
        result.current.addToCart(product2, 3); // 50 * 3 = 150
      });

      const total = result.current.getTotal();
      expect(total).toBeCloseTo(349.98, 2);
    });

    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getTotal()).toBe(0);
    });
  });

  describe('getItemCount', () => {
    it('should count total items in cart', () => {
      const { result } = renderHook(() => useCartStore());

      const product2 = { ...mockProduct, id: 2, name: 'Product 2' };

      act(() => {
        result.current.addToCart(mockProduct, 2);
        result.current.addToCart(product2, 3);
      });

      expect(result.current.getItemCount()).toBe(5);
    });

    it('should return 0 for empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getItemCount()).toBe(0);
    });
  });

  describe('openCart', () => {
    it('should set isOpen to true', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('closeCart', () => {
    it('should set isOpen to false', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.closeCart();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });
});
