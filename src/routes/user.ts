import express from 'express';
import { userController } from '../controllers/user';

export const router = express.Router();

router.get('/validate', userController.validateToken);
router.post('/register', userController.register);
router.get('/login', userController.login);
router.get('/get/all', userController.getAllUsers);

