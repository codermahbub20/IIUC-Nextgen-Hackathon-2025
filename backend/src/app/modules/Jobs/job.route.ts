import express from 'express';
import { JobController } from './job.controller';

const router = express.Router();

router.post('/', JobController.createJob);
router.get('/', JobController.getAllJobs);
router.get('/:jobId', JobController.getSingleJob);
router.patch('/:jobId', JobController.updateJob);
router.delete('/:jobId', JobController.deleteJob);

export const jobRoutes = router;