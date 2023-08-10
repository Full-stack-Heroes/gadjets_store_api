import express from 'express';
import { userController } from '../controllers/user';
import { extractJWT } from '../middleware/extractJWT';
import { userFavoritesController } from '../controllers/favorites';
import { cartController } from '../controllers/cart';
import { orderController } from '../controllers/orders';

export const router = express.Router();

router.get('/validate', extractJWT, userController.validateToken);
router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/favorites', extractJWT, userFavoritesController.getAllFavorites);
router.post('/favorites', extractJWT, userFavoritesController.addFavorite);
router.delete('/favorites', extractJWT, userFavoritesController.deleteFavorite);

router.get('/cart', extractJWT, cartController.getAll);
router.post('/cart', extractJWT, cartController.addToCart);
router.delete('/cart', extractJWT, cartController.remove);

router.get('/orders', extractJWT, orderController.getAllUserOrders);
router.post('/orders', extractJWT, orderController.createOrder);
router.patch('/orders', extractJWT, orderController.changeStatus);

// router.delete('/cart', extractJWT, userFavoritesController.deleteFavorite);
