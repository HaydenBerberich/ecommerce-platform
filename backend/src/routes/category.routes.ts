// src/routes/category.routes.ts
import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware'; // <-- Import

const router = Router();

router.get('/', getAllCategories);       // GET /api/categories
router.get('/:id', getCategoryById);     // GET /api/categories/123
router.post('/', authenticateToken, createCategory);        // POST /api/categories  <-- Added middleware
router.put('/:id', authenticateToken, updateCategory);      // PUT /api/categories/123 <-- Added middleware
router.delete('/:id', authenticateToken, deleteCategory);   // DELETE /api/categories/123 <-- Added middleware

export default router;