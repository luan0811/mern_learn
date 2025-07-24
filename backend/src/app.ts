import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import mongoose from "mongoose";
import { swaggerSpec, swaggerUi } from "./config/swagger";
import dotenv from "dotenv";
import routes from './routes';

const app = express();

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/demo");
    console.log("✅ MongoDB connected at localhost:27017");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
connectDB();

// Middleware setup
app.use(cors({
  origin: "http://localhost:2024",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(compression());

// API Routes
app.use('/', routes);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

export default app;
