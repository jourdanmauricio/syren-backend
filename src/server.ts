import express from 'express';
import router from './routes/indexRouter';
import cors from 'cors';
import morgan from 'morgan';
import {
  errorHandler,
  logErrors,
  boomErrorHandler,
} from './middlewares/errorHandler';

const server = express();
server.use(express.json());
server.use(morgan('prod'));
server.use(cors());

import './utils/auth';

server.use(router);

// Handle Errors
// Tener en cuenta el ordern, primero imprimime en pantalla y luego responde el error
server.use(logErrors);
server.use(boomErrorHandler);
server.use(errorHandler);

export default server;
