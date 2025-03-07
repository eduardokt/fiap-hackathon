import express from 'express';

import {
  create,
  get,
  getById,
  getByUid,
  update,
  del,
} from '../controllers/perfilController.js';

const router = express.Router();

router.get('/', get);
router.post('/new', create);
router.get('/admin/:id', getById);
router.post('/uid', getByUid);
router.get('/uid/:id', getByUid);
router.put('/update/:id', update);
router.delete('/delete/:id', del);

export default router;