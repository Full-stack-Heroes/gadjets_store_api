import express from 'express';
import { userController } from '../controllers/user';
import { extractJWT } from '../middleware/extractJWT';
import { userFavoritesController } from '../controllers/favorites';

export const router = express.Router();

router.get('/validate', extractJWT, userController.validateToken);
router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/favorites', extractJWT, userFavoritesController.getAllFavorites);
router.post('/favorites', extractJWT, userFavoritesController.addFavorites);
router.delete('/favorites', extractJWT, userFavoritesController.deleteFavorite);

// router.get('/all', extractJWT, userController.getAllUsers);
