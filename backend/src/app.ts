import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Base Route
app.use('/api/v1', routes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
