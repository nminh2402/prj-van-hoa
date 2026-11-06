import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`[Error Handler] ${err.message}`, err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi máy chủ nội bộ';
  return ApiResponse.error(res, message, statusCode, err.errors);
};
