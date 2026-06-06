import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes/api.js';
import { requestLogger } from './middlewares/logger.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const app = express();

// Security Middlewares
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(cors());

// Body parser
app.use(express.json());

// Request logging
app.use(requestLogger);

// Routes
app.use('/api', apiRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
