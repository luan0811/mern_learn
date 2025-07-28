import express from 'express';
import * as AuthController from '../../controllers/AuthController';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;
