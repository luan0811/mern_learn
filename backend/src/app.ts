import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import { swaggerSpec, swaggerUi } from './config/swagger';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route';

const app = express();

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/demo');
    console.log('✅ MongoDB connected at localhost:27017');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

app.use(cors({
  origin: 'http://localhost:2024',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(compression());

// Log để kiểm tra khi truy cập /api-docs
app.use('/api-docs', (req: any, res: any, next: () => void) => {
  console.log('Accessing /api-docs');
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Route để kiểm tra JSON thô
app.get('/swagger.json', (req, res) => {
  console.log('Accessing /swagger.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/users', userRoutes);

export default app;