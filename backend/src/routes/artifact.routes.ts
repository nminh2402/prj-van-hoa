import { Router } from 'express';
import { ArtifactController } from '../controllers/artifact.controller';

const router = Router();

router.get('/', ArtifactController.getAll);
router.get('/:id', ArtifactController.getById);
router.post('/', ArtifactController.create);

export default router;
