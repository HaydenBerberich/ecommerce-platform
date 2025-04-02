// src/routes/product.routes.ts
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware'; // <-- Import

const router = Router();

// Public routes (anyone can access)
router.get('/', getAllProducts);         // GET /api/products
router.get('/:id', getProductById);       // GET /api/products/123

// Protected routes (require valid JWT)
router.post('/', authenticateToken, createProduct);          // POST /api/products
router.put('/:id', authenticateToken, updateProduct);        // PUT /api/products/123

// Admin-only route (requires valid JWT + admin privileges)
router.delete('/:id', authenticateToken, isAdmin, deleteProduct); // DELETE /api/products/123 (Example - only admin can delete)

export default router;