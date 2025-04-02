// src/server.ts
import express, { Request, Response, Application } from 'express';
import categoryRoutes from './routes/category.routes'; // Import category router
import productRoutes from './routes/product.routes';   // Import product router

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// Basic route (optional)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript Server!');
});

// ---> Mount API Routers <---
app.use('/api/categories', categoryRoutes); // All category routes will be prefixed with /api/categories
app.use('/api/products', productRoutes);   // All product routes will be prefixed with /api/products

// Basic Error Handling Middleware (Optional but Recommended)
// Add this *after* your routes
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});