import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

// Get all products (with optional pagination)
router.get('/', ProductController.getAllProducts);

// Get product by ID
router.get('/:id', ProductController.getProductById);

export default router;
