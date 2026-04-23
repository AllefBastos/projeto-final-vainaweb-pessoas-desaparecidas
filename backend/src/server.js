import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import 'dotenv/config';

const BACKEND_URL = process.env.BACKEND_URL;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta:${PORT}`);
});