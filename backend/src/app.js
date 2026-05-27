import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment configurations
dotenv.config();

// Validate presence of critical environment configuration secrets
if (!process.env.JWT_SECRET) {
  console.error('CRITICAL BOOT ERROR: The JWT_SECRET environment variable is missing.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middleware
app.use(helmet());
app.use(morgan('dev'));

// CORS configuration - Support dynamic origins in production vs reflective in development
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or local script calls)
    if (!origin) return callback(null, true);
    
    // In development mode, mirror the origin dynamically
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, match against Whitelisted Origins
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    return callback(new Error('Access blocked by CORS policy.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount HMS API routes under /api
app.use('/api', apiRouter);

// Catch-all: Route Not Found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: [${req.method}] ${req.originalUrl}`
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server listening
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  HMS Express server is running on port ${PORT} `);
  console.log(`  API Base URL: http://localhost:${PORT}/api `);
  console.log(`=========================================`);
});

export default app;
