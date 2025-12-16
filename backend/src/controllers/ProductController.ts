import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { ApiResponse } from '../types';

export class ProductController {
  /**
   * @swagger
   * /api/products:
   *   get:
   *     summary: Get all products
   *     tags: [Products]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Page number for pagination
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *         description: Number of items per page
   *     responses:
   *       200:
   *         description: List of products
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Product'
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
  static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

      // If pagination params provided, use paginated endpoint
      if (page || limit) {
        const result = await ProductService.getProductsWithPagination(page, limit);
        res.json({
          success: true,
          ...result,
        });
        return;
      }

      // Otherwise return all products
      const products = await ProductService.getAllProducts();

      const response: ApiResponse<typeof products> = {
        success: true,
        data: products,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     summary: Get product by ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Product ID
   *     responses:
   *       200:
   *         description: Product details
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   $ref: '#/components/schemas/Product'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       400:
   *         description: Invalid product ID
   *       500:
   *         $ref: '#/components/responses/ServerError'
   */
  static async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id) || id <= 0) {
        res.status(400).json({
          success: false,
          error: 'Invalid product ID',
        });
        return;
      }

      const product = await ProductService.getProductById(id);

      if (!product) {
        res.status(404).json({
          success: false,
          error: 'Product not found',
        });
        return;
      }

      const response: ApiResponse<typeof product> = {
        success: true,
        data: product,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
