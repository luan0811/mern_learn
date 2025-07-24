import { Router, Request, Response } from 'express';
import authRouter from './auth';

const router = Router();


router.use('/api/v1/user', authRouter);

export default router;