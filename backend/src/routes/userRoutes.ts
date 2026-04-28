import { Router } from 'express';
import * as userController from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.get('/saved', userController.getSavedColleges);
router.post('/save', userController.saveCollege);
router.delete('/save/:collegeId', userController.unsaveCollege);

export default router;
