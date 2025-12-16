import { ProductModel } from '../models/ProductModel';
import { PaginatedResponse, Product } from '../types';

export class ProductService {
  /**
   * Get all products
   */
  static async getAllProducts(): Promise<Product[]> {
    return await ProductModel.findAll();
  }

  /**
   * Get product by ID
   */
  static async getProductById(id: number): Promise<Product | null> {
    if (!id || id <= 0) {
      throw new Error('Invalid product ID');
    }

    return await ProductModel.findById(id);
  }

  /**
   * Get products with pagination
   */
  static async getProductsWithPagination(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Product>> {
    // Validate pagination parameters
    const validatedPage = Math.max(1, page);
    const validatedLimit = Math.min(Math.max(1, limit), 100); // Max 100 items per page

    const { products, total } = await ProductModel.findWithPagination(
      validatedPage,
      validatedLimit
    );

    const totalPages = Math.ceil(total / validatedLimit);

    return {
      data: products,
      pagination: {
        page: validatedPage,
        limit: validatedLimit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Validate if product exists and has sufficient stock
   */
  static async validateProductAvailability(
    productId: number,
    quantity: number = 1
  ): Promise<{ valid: boolean; message?: string }> {
    if (quantity <= 0) {
      return { valid: false, message: 'Quantity must be greater than 0' };
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return { valid: false, message: 'Product not found' };
    }

    const hasStock = await ProductModel.hasStock(productId, quantity);

    if (!hasStock) {
      return { valid: false, message: 'Insufficient stock' };
    }

    return { valid: true };
  }

  /**
   * Calculate total price for products
   */
  static calculateTotal(products: Array<{ price: number; quantity: number }>): number {
    return products.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  /**
   * Format price to 2 decimal places
   */
  static formatPrice(price: number): string {
    return price.toFixed(2);
  }
}
