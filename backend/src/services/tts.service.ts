import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export class TtsService {
  /**
   * Tổng hợp giọng đọc thuyết minh tiếng Việt từ nội dung văn bản
   * Hỗ trợ Google Cloud TTS hoặc các bên cung cấp (FPT AI, Viettel AI...)
   */
  static async synthesizeSpeech(text: string, voice: 'northern' | 'southern' = 'northern'): Promise<Buffer | null> {
    try {
      if (!env.ttsApiKey) {
        logger.warn('TTS_API_KEY chưa được cấu hình. Giọng đọc sẽ phát qua bộ tổng hợp trên thiết bị di động.');
        return null;
      }

      // Giả lập hoặc cấu hình gọi API nhà cung cấp
      logger.info(`Đang tạo audio thuyết minh cho văn bản (${text.length} ký tự)...`);
      return null;
    } catch (error) {
      logger.error('Lỗi khi chuyển văn bản thành giọng nói:', error);
      throw error;
    }
  }
}
