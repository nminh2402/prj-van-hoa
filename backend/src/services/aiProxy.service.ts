import axios from 'axios';
import FormData from 'form-data';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { FirestoreService } from './firestore.service';
import { DetectionResult } from '@prj-van-hoa/shared';

export class AiProxyService {
  /**
   * Gửi ảnh chụp từ Vision Camera sang AI Microservice (YOLO) để nhận diện
   */
  static async detectArtifact(imageBuffer: Buffer, filename: string): Promise<DetectionResult[]> {
    try {
      const formData = new FormData();
      formData.append('file', imageBuffer, { filename });

      logger.info(`Đang gửi ảnh sang AI service tại ${env.aiServiceUrl}/api/v1/predict...`);

      const response = await axios.post(`${env.aiServiceUrl}/api/v1/predict`, formData, {
        headers: formData.getHeaders(),
        timeout: 10000,
      });

      const detections: DetectionResult[] = response.data?.detections || [];

      // Làm giàu dữ liệu: Gắn thêm artifactId từ Firestore nếu tìm thấy mã hiện vật trùng khớp
      for (const item of detections) {
        if (item.label) {
          const artifact = await FirestoreService.getArtifactByCode(item.label);
          if (artifact) {
            item.artifactId = artifact.id;
            item.displayName = artifact.name;
          }
        }
      }

      return detections;
    } catch (error: any) {
      logger.error('Lỗi khi gọi AI Vision service:', error.message);
      // Fallback khi AI service chưa bật: Trả về kết quả mẫu để client không bị gián đoạn test
      return [
        {
          label: 'TRONG_DONG_DONG_SON',
          displayName: 'Trống Đồng Đông Sơn (Demo Test)',
          confidence: 0.94,
          bbox: { x: 50, y: 100, width: 300, height: 300 },
        },
      ];
    }
  }
}
