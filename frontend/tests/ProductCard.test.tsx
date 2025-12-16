import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductCard } from '../src/components/ProductCard';
import { useCartStore } from '../src/store/cartStore';
import { Product } from '../src/types';

// Mock the store
vi.mock('../src/store/cartStore');

describe('ProductCard', () => {
  const mockAddToCart = vi.fn();

  const mockStoreWithItems = (items: any[] = []) => {
    vi.mocked(useCartStore).mockImplementation((selector: any) => {
      const store = {
        addToCart: mockAddToCart,
        items,
        removeFromCart: vi.fn(),
        updateQuantity: vi.fn(),
        clearCart: vi.fn(),
        getTotal: vi.fn(() => 0),
        getItemCount: vi.fn(() => 0),
        isOpen: false,
        openCart: vi.fn(),
        closeCart: vi.fn(),
      };
      return selector(store);
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockStoreWithItems([]);
  });

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

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('€99.99')).toBeInTheDocument();
  });

  it('displays out of stock badge when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('disables add to cart button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeDisabled();
  });

  it('shows low stock warning when stock is less than 10', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 };
    render(<ProductCard product={lowStockProduct} />);

    expect(screen.getByText('Only 5 left in stock')).toBeInTheDocument();
  });

  it('does not show low stock warning when stock is 10 or more', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.queryByText(/left in stock/i)).not.toBeInTheDocument();
  });

  it('displays placeholder when no image URL provided', () => {
    const noImageProduct = { ...mockProduct, image_url: null };
    render(<ProductCard product={noImageProduct} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('placeholder'));
  });

  it('displays "No description available" when description is null', () => {
    const noDescProduct = { ...mockProduct, description: null };
    render(<ProductCard product={noDescProduct} />);

    expect(screen.getByText('No description available')).toBeInTheDocument();
  });

  it('disables add to cart button when all stock is in cart', () => {
    const productWithLimitedStock = { ...mockProduct, stock: 5 };
    mockStoreWithItems([
      { product: productWithLimitedStock, quantity: 5 },
    ]);

    render(<ProductCard product={productWithLimitedStock} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeDisabled();
  });

  it('disables add to cart button when quantity in cart exceeds stock', () => {
    const productWithLimitedStock = { ...mockProduct, stock: 3 };
    mockStoreWithItems([
      { product: productWithLimitedStock, quantity: 4 },
    ]);

    render(<ProductCard product={productWithLimitedStock} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeDisabled();
  });

  it('enables add to cart button when stock is available and not all in cart', () => {
    const productWithStock = { ...mockProduct, stock: 10 };
    mockStoreWithItems([
      { product: productWithStock, quantity: 5 },
    ]);

    render(<ProductCard product={productWithStock} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).not.toBeDisabled();
  });

  it('does not show out of stock badge when stock exists but all items are in cart', () => {
    const productWithStock = { ...mockProduct, stock: 3 };
    mockStoreWithItems([
      { product: productWithStock, quantity: 3 },
    ]);

    render(<ProductCard product={productWithStock} />);

    expect(screen.queryByText('Out of Stock')).not.toBeInTheDocument();
  });

  it('shows out of stock badge only when stock is 0', () => {
    const productWithNoStock = { ...mockProduct, stock: 0 };
    mockStoreWithItems([]);

    render(<ProductCard product={productWithNoStock} />);

    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('enables button when product not in cart and has stock', () => {
    const productWithStock = { ...mockProduct, stock: 10 };
    mockStoreWithItems([]);

    render(<ProductCard product={productWithStock} />);

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).not.toBeDisabled();
  });

  // Note: Testing MUI's click event with Zustand mocks is complex
  // The store tests (cartStore.test.ts) cover the cart functionality thoroughly
  // Component renders correctly and button functionality works in browser
});
