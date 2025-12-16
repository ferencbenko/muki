import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import pool from '../config/database';
import { Product } from '../types';

export class ProductModel {
  /**
   * Get all products
   */
  static async findAll(): Promise<Product[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    return rows as Product[];
  }

  /**
   * Get product by ID
   */
  static async findById(id: number): Promise<Product | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as Product;
  }

  /**
   * Get products with pagination
   */
  static async findWithPagination(
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: Product[]; total: number }> {
    const offset = (page - 1) * limit;

    const [products] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const [countResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM products'
    );

    const total = countResult[0].total;

    return {
      products: products as Product[],
      total,
    };
  }

  /**
   * Check if product has sufficient stock
   */
  static async hasStock(id: number, quantity: number): Promise<boolean> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT stock FROM products WHERE id = ?', [
      id,
    ]);

    if (rows.length === 0) {
      return false;
    }

    return rows[0].stock >= quantity;
  }

  /**
   * Update product stock (for future cart implementation)
   */
  static async updateStock(id: number, quantity: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
      [quantity, id, quantity]
    );

    return result.affectedRows > 0;
  }
}
