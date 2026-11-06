import { Request, Response, NextFunction } from 'express';
import { AiProxyService } from '../services/aiProxy.service';
import { ApiResponse } from '../utils/apiResponse';

export class AiController {
  /**
   * Tiếp nhận ảnh chụp từ mobile app và gửi sang YOLO service để nhận diện hiện vật
   */
  static async detect(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      if (!file) {
        return ApiResponse.error(res, 'Vui lòng đính kèm file ảnh (file)', 400);
      }

      const startTime = Date.now();
      const detections = await AiProxyService.detectArtifact(file.buffer, file.originalname);
      const inferenceTimeMs = Date.now() - startTime;

      return ApiResponse.success(
        res,
        {
          inferenceTimeMs,
          detections,
        },
        'Nhận diện hiện vật thành công'
      );
    } catch (error) {
      next(error);
    }
  }
}
