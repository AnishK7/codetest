import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { createCounterRouter } from './routes/counter';
import { createHealthRouter } from './routes/health';
import { SolanaService } from './services/solana';

export const createApp = (solanaService: SolanaService) => {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined'));

  app.use('/health', createHealthRouter(solanaService));
  app.use('/api/counter', createCounterRouter(solanaService));

  app.use('*', (_req, res) => {
    res.status(404).json({
      error: {
        message: 'Resource not found',
      },
    });
  });

  app.use(errorHandler);

  return app;
};
