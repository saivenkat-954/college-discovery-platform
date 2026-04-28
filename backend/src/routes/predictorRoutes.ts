import { Router } from 'express';
import * as predictorController from '../controllers/predictorController';

const router = Router();

router.post('/predict', predictorController.predictColleges);

export default router;
