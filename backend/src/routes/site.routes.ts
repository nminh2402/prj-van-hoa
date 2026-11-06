import { Router } from 'express';
import { SiteController } from '../controllers/site.controller';

const router = Router();

router.get('/', SiteController.getAll);
router.get('/:id', SiteController.getById);
router.post('/', SiteController.create);

export default router;
