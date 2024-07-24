import express from 'express';

import {
  createUser,
  login,
  logout,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/new', createUser);
router.post('/login', login);
router.get('/logout');

export default router;