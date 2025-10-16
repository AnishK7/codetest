import type { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }

  const message = err instanceof Error ? err.message : 'Unknown error';

  // eslint-disable-next-line no-console
  console.error('[UnhandledError]', err);

  return res.status(500).json({
    error: {
      message: 'Internal server error',
      details: [{ message }],
    },
  });
};
