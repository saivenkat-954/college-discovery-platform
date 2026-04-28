import { Router } from 'express';
import * as collegeController from '../controllers/collegeController';

const router = Router();

router.get('/', collegeController.getAllColleges);
router.get('/compare', collegeController.compareColleges);
router.get('/:slug', collegeController.getCollegeBySlug);

export default router;
