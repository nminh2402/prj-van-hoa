import { Router } from 'express';
import { AudioController } from '../controllers/audio.controller';

const router = Router();

router.post('/synthesize', AudioController.synthesize);

export default router;
