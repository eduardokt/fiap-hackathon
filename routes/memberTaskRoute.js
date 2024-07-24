import express from 'express';
import {
  getGroupByMember,
  createMemberTask,
  updateMemberTask
} from '../controllers/memberTaskController.js';

const router = express.Router();

router.get('/', getGroupByMember);
router.post('/new', createMemberTask);
router.put('/update/:id', updateMemberTask);

export default router;