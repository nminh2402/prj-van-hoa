import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';
import { ApiResponse } from '../utils/apiResponse';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyFirebaseToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.error(res, 'Yêu cầu token xác thực hợp lệ (Bearer token)', 401);
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error: any) {
    return ApiResponse.error(res, 'Token không hợp lệ hoặc đã hết hạn', 403, error.message);
  }
};
