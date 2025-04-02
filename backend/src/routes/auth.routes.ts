// src/routes/auth.routes.ts
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser); // POST /api/auth/register
router.post('/login', loginUser);     // POST /api/auth/login

export default router;