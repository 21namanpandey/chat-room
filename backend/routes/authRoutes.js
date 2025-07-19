import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { body } from 'express-validator'; 

const router = express.Router();

const registerValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

export default router;
