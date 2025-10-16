import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '../errors/AppError';

export const validateBody =
  <T extends z.ZodSchema>(schema: T) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) {
        const details = parsed.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        throw new ValidationError('Request validation failed', details);
      }
      req.body = parsed.data;
      next();
    } catch (error) {
      next(error);
    }
  };

export const validateQuery =
  <T extends z.ZodSchema>(schema: T) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.safeParse(req.query);
      if (!parsed.success) {
        const details = parsed.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        throw new ValidationError('Query validation failed', details);
      }
      req.query = parsed.data as any;
      next();
    } catch (error) {
      next(error);
    }
  };

export const validateParams =
  <T extends z.ZodSchema>(schema: T) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.safeParse(req.params);
      if (!parsed.success) {
        const details = parsed.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        throw new ValidationError('Params validation failed', details);
      }
      req.params = parsed.data as any;
      next();
    } catch (error) {
      next(error);
    }
  };

