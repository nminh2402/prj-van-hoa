import { Router } from 'express';
import artifactRoutes from './artifact.routes';
import siteRoutes from './site.routes';
import audioRoutes from './audio.routes';
import aiRoutes from './ai.routes';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Nền tảng Di sản Văn hóa API đang hoạt động', timestamp: new Date() });
});

router.use('/artifacts', artifactRoutes);
router.use('/sites', siteRoutes);
router.use('/audio', audioRoutes);
router.use('/ai', aiRoutes);

export default router;
