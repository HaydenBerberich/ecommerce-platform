// src/controllers/category.controller.ts
import { Request, Response } from 'express';
import prisma from '../lib/prisma'; // Import the Prisma client instance

// GET /api/categories - Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};

// Example fix for getCategoryById
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return; // Early return without returning the response object
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch category', error: error.message });
  }
};

// POST /api/categories - Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  // Basic validation
  if (!name) {
    res.status(400).json({ message: 'Category name is required' });
    return;
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description, // Optional, will be null if not provided
      },
    });
    res.status(201).json(newCategory); // 201 Created status
  } catch (error: any) {
     // Handle potential unique constraint violation (e.g., duplicate name)
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
         res.status(409).json({ message: 'Category name already exists' }); // 409 Conflict
         return;
    }
    res.status(500).json({ message: 'Failed to create category', error: error.message });
  }
};

// PUT /api/categories/:id - Update a category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

   // Basic validation
  if (!name) {
    res.status(400).json({ message: 'Category name is required for update' });
    return;
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    // Handle case where category to update is not found
    if (error.code === 'P2025') {
         res.status(404).json({ message: 'Category not found' });
         return;
    }
     // Handle potential unique constraint violation on update
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
         res.status(409).json({ message: 'Another category with this name already exists' });
         return;
    }
    res.status(500).json({ message: 'Failed to update category', error: error.message });
  }
};

// DELETE /api/categories/:id - Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id: parseInt(id, 10) },
    });
    // Note: If products depend on this category, deletion might fail due to foreign key constraints
    res.status(204).send(); // 204 No Content status
  } catch (error: any) {
    // Handle case where category to delete is not found
    if (error.code === 'P2025') {
         res.status(404).json({ message: 'Category not found' });
         return;
    }
    // Handle foreign key constraint violation (products associated)
    if (error.code === 'P2003') {
         res.status(409).json({ message: 'Cannot delete category because products are associated with it.' });
         return;
    }
    res.status(500).json({ message: 'Failed to delete category', error: error.message });
  }
};