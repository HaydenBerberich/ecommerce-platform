// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Prisma } from '@prisma/client'; // Import Prisma types for Decimal handling

// GET /api/products - Get all products (potentially include category)
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }, // Include related category data
    });
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// GET /api/products/:id - Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
      include: { category: true }, // Include category data
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

// POST /api/products - Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, stockQuantity, imageUrls, categoryId } = req.body;

  // Basic Validation
  if (!name || !description || price === undefined || stockQuantity === undefined || !categoryId) {
    res.status(400).json({ message: 'Missing required product fields (name, description, price, stockQuantity, categoryId)' });
    return;
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: new Prisma.Decimal(price), // Convert price to Decimal
        stockQuantity: parseInt(stockQuantity, 10), // Ensure stock is an integer
        imageUrls: imageUrls || [], // Default to empty array if not provided
        categoryId: parseInt(categoryId, 10), // Ensure categoryId is an integer
      },
      include: { category: true }, // Include category in the response
    });
    res.status(201).json(newProduct);
  } catch (error: any) {
    // Handle foreign key constraint violation (categoryId doesn't exist)
    if (error.code === 'P2003' && error.meta?.field_name?.includes('categoryId')) {
      res.status(400).json({ message: 'Invalid categoryId: The specified category does not exist.' });
      return;
    }
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

// PUT /api/products/:id - Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stockQuantity, imageUrls, categoryId } = req.body;

  // Construct data object carefully, only including fields that are present in the request
  const dataToUpdate: Prisma.ProductUpdateInput = {};
  if (name !== undefined) dataToUpdate.name = name;
  if (description !== undefined) dataToUpdate.description = description;
  if (price !== undefined) dataToUpdate.price = new Prisma.Decimal(price);
  if (stockQuantity !== undefined) dataToUpdate.stockQuantity = parseInt(stockQuantity, 10);
  if (imageUrls !== undefined) dataToUpdate.imageUrls = imageUrls;

  // Handle categoryId update correctly
  if (categoryId !== undefined) {
    dataToUpdate.category = {
      connect: { id: parseInt(categoryId, 10) }
    };
  }

  if (Object.keys(dataToUpdate).length === 0) {
    res.status(400).json({ message: 'No valid fields provided for update.' });
    return;
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: dataToUpdate,
      include: { category: true },
    });
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    if (error.code === 'P2025') { // Record to update not found
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    // Handle foreign key constraint violation (categoryId doesn't exist)
    if (error.code === 'P2003' && error.meta?.field_name?.includes('categoryId')) {
      res.status(400).json({ message: 'Invalid categoryId: The specified category does not exist.' });
      return;
    }
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

// DELETE /api/products/:id - Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id, 10) },
    });
    // If successful, Prisma doesn't return the deleted object
    res.status(204).send(); // 204 No Content
  } catch (error: any) {
    if (error.code === 'P2025') { // Record to delete not found
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    // Note: Deleting products usually doesn't cause FK issues unless OrderItems depend on it,
    // which we haven't implemented yet.
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};