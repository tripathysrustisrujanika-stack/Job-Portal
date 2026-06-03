const express = require('express');
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require('../controllers/job.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', authMiddleware, createJob);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

module.exports = router;
