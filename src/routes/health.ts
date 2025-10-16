import { Router, Request, Response, NextFunction } from 'express';
import { SolanaService } from '../services/solana';
import { HealthCheckResponse } from '../types/api';

export const createHealthRouter = (solanaService: SolanaService): Router => {
  const router = Router();

  router.get(
    '/',
    async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const clusterInfo = await solanaService.getClusterInfo();

        const response: HealthCheckResponse = {
          status: 'ok',
          solanaCluster: clusterInfo.cluster,
          programId: clusterInfo.programId,
        };

        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );

  return router;
};
