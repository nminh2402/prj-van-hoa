import { Request, Response, NextFunction } from 'express';
import { FirestoreService } from '../services/firestore.service';
import { ApiResponse } from '../utils/apiResponse';

export class ArtifactController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string | undefined;
      const limit = parseInt(req.query.limit as string || '20', 10);
      const artifacts = await FirestoreService.getAllArtifacts(category, limit);
      return ApiResponse.success(res, artifacts, 'Lấy danh sách hiện vật thành công');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const artifact = await FirestoreService.getArtifactById(id);
      if (!artifact) {
        return ApiResponse.error(res, 'Không tìm thấy hiện vật', 404);
      }
      return ApiResponse.success(res, artifact, 'Lấy thông tin chi tiết hiện vật thành công');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await FirestoreService.createArtifact(req.body);
      return ApiResponse.success(res, created, 'Thêm mới hiện vật thành công', 201);
    } catch (error) {
      next(error);
    }
  }
}
