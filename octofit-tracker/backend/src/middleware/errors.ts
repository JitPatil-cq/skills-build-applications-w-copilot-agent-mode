import type { ErrorRequestHandler, RequestHandler } from 'express';
import mongoose from 'mongoose';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const notFoundHandler: RequestHandler = (_request, _response, next) => {
  next(new ApiError(404, 'Route not found'));
};

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof ApiError) {
    response.status(error.status).json({ error: error.message });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: error.message });
    return;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  ) {
    response.status(409).json({ error: 'A record with this unique value already exists' });
    return;
  }

  if (error instanceof SyntaxError && 'body' in error) {
    response.status(400).json({ error: 'Invalid JSON request body' });
    return;
  }

  console.error('Unhandled API error:', error);
  response.status(500).json({ error: 'Internal server error' });
};
