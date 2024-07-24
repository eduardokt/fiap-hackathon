import express from 'express';

import {
  create,
  get,
  getById,
  update,
  del,
} from '../controllers/categoriaController.js';

const router = express.Router();

router.get('/', get);
router.post('/new', create);
router.get('/categoria/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', del);

export default router;