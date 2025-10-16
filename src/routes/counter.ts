import { Router, Request, Response, NextFunction } from 'express';
import { SolanaService } from '../services/solana';
import { validateBody } from '../middleware/validateRequest';
import {
  InitializeCounterRequestSchema,
  IncrementCounterRequestSchema,
  InitializeCounterResponse,
  IncrementCounterResponse,
  GetCounterResponse,
} from '../types/api';

export const createCounterRouter = (solanaService: SolanaService): Router => {
  const router = Router();

  router.post(
    '/initialize',
    validateBody(InitializeCounterRequestSchema),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { seed } = req.body;
        const result = await solanaService.initializeCounter(seed);

        const response: InitializeCounterResponse = {
          success: true,
          counterAddress: result.counterAddress,
          seed: result.seed,
          signature: result.signature,
        };

        res.status(201).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  router.post(
    '/increment',
    validateBody(IncrementCounterRequestSchema),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { counterAddress } = req.body;
        const result = await solanaService.incrementCounter(counterAddress);

        const response: IncrementCounterResponse = {
          success: true,
          counterAddress,
          newCount: result.newCount,
          signature: result.signature,
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  router.get(
    '/:counterAddress',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { counterAddress } = req.params;
        const result = await solanaService.getCounterData(counterAddress);

        const response: GetCounterResponse = {
          success: true,
          counterAddress,
          authority: result.authority,
          count: result.count,
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  return router;
};
