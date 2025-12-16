import { ProductModel } from '../src/models/ProductModel';
import { ProductService } from '../src/services/ProductService';
import { Product } from '../src/types';

// Mock the ProductModel
jest.mock('../src/models/ProductModel');

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    image_url: 'https://example.com/image.jpg',
    stock: 10,
    created_at: new Date(),
    updated_at: new Date(),
  };

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [mockProduct];
      (ProductModel.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const result = await ProductService.getAllProducts();

      expect(result).toEqual(mockProducts);
      expect(ProductModel.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no products', async () => {
      (ProductModel.findAll as jest.Mock).mockResolvedValue([]);

      const result = await ProductService.getAllProducts();

      expect(result).toEqual([]);
    });
  });

  describe('getProductById', () => {
    it('should return product when valid ID provided', async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);

      const result = await ProductService.getProductById(1);

      expect(result).toEqual(mockProduct);
      expect(ProductModel.findById).toHaveBeenCalledWith(1);
    });

    it('should return null when product not found', async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await ProductService.getProductById(999);

      expect(result).toBeNull();
    });

    it('should throw error for invalid ID', async () => {
      await expect(ProductService.getProductById(0)).rejects.toThrow('Invalid product ID');
      await expect(ProductService.getProductById(-1)).rejects.toThrow('Invalid product ID');
    });
  });

  describe('getProductsWithPagination', () => {
    it('should return paginated products', async () => {
      const mockProducts = [mockProduct];
      (ProductModel.findWithPagination as jest.Mock).mockResolvedValue({
        products: mockProducts,
        total: 1,
      });

      const result = await ProductService.getProductsWithPagination(1, 10);

      expect(result).toEqual({
        data: mockProducts,
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      });
    });

    it('should validate and correct invalid page numbers', async () => {
      (ProductModel.findWithPagination as jest.Mock).mockResolvedValue({
        products: [],
        total: 0,
      });

      await ProductService.getProductsWithPagination(0, 10);

      expect(ProductModel.findWithPagination).toHaveBeenCalledWith(1, 10);
    });

    it('should limit maximum items per page to 100', async () => {
      (ProductModel.findWithPagination as jest.Mock).mockResolvedValue({
        products: [],
        total: 0,
      });

      await ProductService.getProductsWithPagination(1, 200);

      expect(ProductModel.findWithPagination).toHaveBeenCalledWith(1, 100);
    });

    it('should calculate correct total pages', async () => {
      (ProductModel.findWithPagination as jest.Mock).mockResolvedValue({
        products: [],
        total: 25,
      });

      const result = await ProductService.getProductsWithPagination(1, 10);

      expect(result.pagination.totalPages).toBe(3);
    });

    it('should validate and correct negative page numbers', async () => {
      (ProductModel.findWithPagination as jest.Mock).mockResolvedValue({
        products: [],
        total: 0,
      });

      await ProductService.getProductsWithPagination(-5, 10);

      expect(ProductModel.findWithPagination).toHaveBeenCalledWith(1, 10);
    });

    it('should validate and correct negative limit', async () => {
      (ProductModel.findWithPagination as jest.Mock).mockResolvedValue({
        products: [],
        total: 0,
      });

      await ProductService.getProductsWithPagination(1, -10);

      expect(ProductModel.findWithPagination).toHaveBeenCalledWith(1, 1);
    });

    it('should use default parameters when not provided', async () => {
      (ProductModel.findWithPagination as jest.Mock).mockResolvedValue({
        products: [],
        total: 0,
      });

      await ProductService.getProductsWithPagination();

      expect(ProductModel.findWithPagination).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('validateProductAvailability', () => {
    it('should return valid for available product', async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);
      (ProductModel.hasStock as jest.Mock).mockResolvedValue(true);

      const result = await ProductService.validateProductAvailability(1, 5);

      expect(result).toEqual({ valid: true });
    });

    it('should return invalid for non-existent product', async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await ProductService.validateProductAvailability(999, 1);

      expect(result).toEqual({
        valid: false,
        message: 'Product not found',
      });
    });

    it('should return invalid for insufficient stock', async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);
      (ProductModel.hasStock as jest.Mock).mockResolvedValue(false);

      const result = await ProductService.validateProductAvailability(1, 100);

      expect(result).toEqual({
        valid: false,
        message: 'Insufficient stock',
      });
    });

    it('should return invalid for zero or negative quantity', async () => {
      const result1 = await ProductService.validateProductAvailability(1, 0);
      const result2 = await ProductService.validateProductAvailability(1, -1);

      expect(result1).toEqual({
        valid: false,
        message: 'Quantity must be greater than 0',
      });
      expect(result2).toEqual({
        valid: false,
        message: 'Quantity must be greater than 0',
      });
    });
  });

  describe('calculateTotal', () => {
    it('should calculate correct total for single item', () => {
      const items = [{ price: 10, quantity: 2 }];
      const total = ProductService.calculateTotal(items);

      expect(total).toBe(20);
    });

    it('should calculate correct total for multiple items', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
        { price: 20, quantity: 1 },
      ];
      const total = ProductService.calculateTotal(items);

      expect(total).toBe(55);
    });

    it('should return 0 for empty cart', () => {
      const items: Array<{ price: number; quantity: number }> = [];
      const total = ProductService.calculateTotal(items);

      expect(total).toBe(0);
    });

    it('should handle decimal prices correctly', () => {
      const items = [{ price: 10.99, quantity: 3 }];
      const total = ProductService.calculateTotal(items);

      expect(total).toBeCloseTo(32.97, 2);
    });
  });

  describe('formatPrice', () => {
    it('should format price with 2 decimal places', () => {
      expect(ProductService.formatPrice(10)).toBe('10.00');
      expect(ProductService.formatPrice(10.5)).toBe('10.50');
      expect(ProductService.formatPrice(10.99)).toBe('10.99');
    });

    it('should round to 2 decimal places', () => {
      expect(ProductService.formatPrice(10.999)).toBe('11.00');
      expect(ProductService.formatPrice(10.994)).toBe('10.99');
    });

    it('should handle negative prices', () => {
      expect(ProductService.formatPrice(-10.5)).toBe('-10.50');
    });
  });
});
