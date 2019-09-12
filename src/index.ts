import * as dotenv from 'dotenv';
import express from 'express';

import {Controllers, createControllers} from './controllers';
import {createRouters, Routers} from './routers';
import {Server} from './server';
import { Models, createModels } from './models';
import { prepareApis } from './loaders';

dotenv.config();

const PORT = +process.env.PORT || 3001;

const app: express.Application = express();


async function createApp() {
  const {mongo} = await prepareApis();


  const models: Models = createModels(mongo);
  const controllers: Controllers = createControllers(models);
  const router: Routers = createRouters(controllers);
  const server: Server = new Server(app, router);
  
  await server.listen(PORT);
}

createApp()
  .then(() => {
    console.info(`Server running on port ${PORT}...`)
  })
  .catch((err) => {
    console.error(err)
  })