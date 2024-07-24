import express from 'express';

import {
  create,
  get,
  getById,
  update,
  del,
} from '../controllers/ongController.js';

const router = express.Router();

router.get('/', get);
router.post('/new', create);
router.get('/ong/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', del);

export default router;