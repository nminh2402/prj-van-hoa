import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// Upload 1 ảnh để nhận diện hiện vật
router.post('/detect', upload.single('file'), AiController.detect);

export default router;
