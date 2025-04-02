// src/server.ts
import express, { Request, Response, Application, NextFunction } from 'express'; // Add NextFunction
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes'; // <-- Import Auth Routes

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Basic route (optional)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript Server!');
});

// ---> Mount API Routers <---
app.use('/api/auth', authRoutes);         // Mount Auth routes *before* protected routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Basic Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // Added NextFunction type
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});