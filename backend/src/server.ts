import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import swaggerSpec from './config/swagger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import healthRoutes from './routes/healthRoutes';
import productRoutes from './routes/productRoutes';

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', healthRoutes);
app.use('/api/products', productRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;

/* eslint-disable no-console */
app.listen(PORT, () => {
  console.log(`đźš€ Server running on port ${PORT}`);
  console.log(`đź“š API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`đźŹĄ Health check: http://localhost:${PORT}/api/health`);
  console.log(`đź›Ťď¸Ź  Products API: http://localhost:${PORT}/api/products`);
});
/* eslint-enable no-console */

export default app;
