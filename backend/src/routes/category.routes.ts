// src/routes/category.routes.ts
import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller'; // Adjust path as needed

const router = Router();

router.get('/', getAllCategories);       // GET /api/categories
router.get('/:id', getCategoryById);     // GET /api/categories/123
router.post('/', createCategory);        // POST /api/categories
router.put('/:id', updateCategory);      // PUT /api/categories/123
router.delete('/:id', deleteCategory);   // DELETE /api/categories/123

export default router;