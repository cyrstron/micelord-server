import * as dotenv from 'dotenv';
import express from 'express';
import {Controllers, createControllers} from './controllers';
import {createRouters, Routers} from './routers';
import {Server} from './server';

dotenv.config();

const PORT = +process.env.PORT || 3001;

const app: express.Application = express();

const controllers: Controllers = createControllers();
const router: Routers = createRouters(controllers);
const server: Server = new Server(app, router);

server.listen(PORT)
  .then((): void => {
    console.info(`Server is listening on ${PORT} port`);
  })
  .catch((err: Error): void => {
    console.error(err);
  });
