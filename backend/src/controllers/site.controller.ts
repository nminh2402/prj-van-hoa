import { Request, Response, NextFunction } from 'express';
import { FirestoreService } from '../services/firestore.service';
import { ApiResponse } from '../utils/apiResponse';

export class SiteController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string || '50', 10);
      const sites = await FirestoreService.getAllSites(limit);
      return ApiResponse.success(res, sites, 'Lấy danh sách địa điểm di tích thành công');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const site = await FirestoreService.getSiteById(id);
      if (!site) {
        return ApiResponse.error(res, 'Không tìm thấy di tích', 404);
      }
      return ApiResponse.success(res, site, 'Lấy thông tin di tích thành công');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await FirestoreService.createSite(req.body);
      return ApiResponse.success(res, created, 'Thêm mới di tích thành công', 201);
    } catch (error) {
      next(error);
    }
  }
}
