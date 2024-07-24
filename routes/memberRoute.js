import express from 'express';

import {
  createMembers,
  getMember,
  getMembers,
  updateMember,
  deleteMember,
} from '../controllers/memberController.js';

const router = express.Router();

router.get('/', getMembers);
router.post('/new', createMembers);
router.get('/member/:id', getMember);
router.put('/update/:id', updateMember);
router.delete('/delete/:id', deleteMember);

export default router;