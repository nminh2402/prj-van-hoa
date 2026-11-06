import { Request, Response, NextFunction } from 'express';
import { TtsService } from '../services/tts.service';
import { ApiResponse } from '../utils/apiResponse';

export class AudioController {
  /**
   * Tạo audio thuyết minh động từ văn bản
   */
  static async synthesize(req: Request, res: Response, next: NextFunction) {
    try {
      const { text, voice } = req.body;
      if (!text) {
        return ApiResponse.error(res, 'Vui lòng cung cấp nội dung văn bản (text)', 400);
      }

      const audioBuffer = await TtsService.synthesizeSpeech(text, voice);
      if (!audioBuffer) {
        return ApiResponse.success(res, { fallbackToClientTTS: true }, 'Vui lòng sử dụng TTS nội bộ của thiết bị');
      }

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length,
      });
      return res.send(audioBuffer);
    } catch (error) {
      next(error);
    }
  }
}
