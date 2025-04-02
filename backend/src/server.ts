import express, { Request, Response, Application } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 3001; // Use environment variable or default port

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express + TypeScript Server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});