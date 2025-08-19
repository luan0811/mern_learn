import { Router, Request, Response } from 'express';
import authRouter from './auth';
import userRouter from './admin';
const router = Router();


router.use('/api/v1/auth', authRouter);
router.use('/api/v1/user', userRouter);

export default router;