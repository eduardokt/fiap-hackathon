import express from 'express';

import {
  create,
  get,
  getById,
  update,
  del,
} from '../controllers/estadosCidadesController.js';

const router = express.Router();

router.get('/', get);
router.post('/new', create);
router.get('/estados_cidades/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', del);

export default router;