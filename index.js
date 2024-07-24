import express from 'express';
import cors from 'cors';

import config from './config.js';
import authRoute from './routes/authRoute.js';
import ongRoute from './routes/ongRoute.js';
import categoriaRoute from './routes/categoriaRoute.js';
import estadosCidadesRoute from './routes/estadosCidadesRoute.js';
import adminRoute from './routes/adminRoute.js';
import inscricaoRoute from './routes/inscricaoRoute.js';
import perfilRoute from './routes/perfilRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoute);
app.use('/api/ongs', ongRoute);
app.use('/api/categoria', categoriaRoute);
app.use('/api/estados_cidades', estadosCidadesRoute);
app.use('/api/admin', adminRoute);
app.use('/api/inscricoes', inscricaoRoute);
app.use('/api/perfil', perfilRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
