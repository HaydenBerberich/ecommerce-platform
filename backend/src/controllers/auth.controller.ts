// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10; // Cost factor for bcrypt hashing

// POST /api/auth/register - Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Basic Input Validation
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters long'});
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: 'Email already in use' }); // 409 Conflict
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name, // Optional name field
      },
      // Select only non-sensitive fields to return
      select: { id: true, email: true, name: true, isAdmin: true, createdAt: true }
    });

    res.status(201).json({ message: 'User registered successfully', user });

  } catch (error: any) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

// POST /api/auth/login - Log in a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' }); // Use generic message for security
      return;
    }

    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' }); // Use generic message
      return;
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not defined in environment variables');
      res.status(500).json({ message: 'Internal server error: JWT configuration missing.' });
      return;
    }

    // Payload for the token (include essential, non-sensitive info)
    const payload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin, // Include admin status if needed for authorization
    };

    // Sign the token
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '1h', // Token expiration time (e.g., 1 hour, '7d' for 7 days)
    });

    // Return the token (and optionally some user info)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { // Send back some non-sensitive user info
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      }
    });

  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Failed to log in user', error: error.message });
  }
};