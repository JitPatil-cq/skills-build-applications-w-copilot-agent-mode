import type { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { ApiError } from './errors.js';

export const requireJsonObject: RequestHandler = (request, _response, next) => {
  const body: unknown = request.body;
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length === 0) {
    next(new ApiError(400, 'Request body must be a non-empty JSON object'));
    return;
  }

  next();
};

export function requireValidObjectId(parameter: string): RequestHandler {
  return (request, _response, next) => {
    const value = request.params[parameter];
    if (!mongoose.isValidObjectId(value)) {
      next(new ApiError(400, `Invalid ${parameter}`));
      return;
    }

    next();
  };
}

export const requireValidId = requireValidObjectId('id');
