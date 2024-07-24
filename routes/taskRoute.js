import express from 'express';

import {
  createTasks,
  getTask,
  getTasks,
  updateTasks,
  deleteTasks,
} from '../controllers/tasksController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/new', createTasks);
router.get('/task/:id', getTask);
router.put('/update/:id', updateTasks);
router.delete('/delete/:id', deleteTasks);

export default router;