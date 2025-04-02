// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a type that extends the Express Request to include our 'user' payload
export interface AuthRequest extends Request {
    user?: string | jwt.JwtPayload; // Add the user property decoded from JWT
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get token from the Authorization header (Bearer TOKEN)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token part

  if (token == null) {
    // No token provided
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET not defined.');
    res.status(500).json({ message: 'Internal Server Error: JWT configuration missing' });
    return;
  }

  // Verify the token
  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Unauthorized: Token expired' });
            return;
        }
      // Token is invalid (e.g., wrong signature)
      console.error("JWT Verification Error:", err.message);
      res.status(403).json({ message: 'Forbidden: Invalid token' });
      return;
    }

    // Token is valid, attach the decoded user payload to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

// Optional: Middleware to check for admin role (if you have isAdmin in JWT payload)
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Ensure authenticateToken ran first and req.user exists and has isAdmin property
    if (!req.user || typeof req.user === 'string' || !req.user.isAdmin) {
        res.status(403).json({ message: 'Forbidden: Requires admin access' });
        return;
    }
    next(); // User is admin, proceed
};