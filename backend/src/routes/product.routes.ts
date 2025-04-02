// src/routes/product.routes.ts
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller'; // Adjust path as needed

const router = Router();

router.get('/', getAllProducts);         // GET /api/products
router.get('/:id', getProductById);       // GET /api/products/123
router.post('/', createProduct);          // POST /api/products
router.put('/:id', updateProduct);        // PUT /api/products/123
router.delete('/:id', deleteProduct);     // DELETE /api/products/123

export default router;