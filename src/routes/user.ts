import express from 'express';
import { userController } from '../controllers/user';
import { extractJWT } from '../middleware/extractJWT';

export const router = express.Router();

router.get('/validate', extractJWT, userController.validateToken);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', userController.getAllUsers);
