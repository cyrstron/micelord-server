import * as dotenv from 'dotenv';

dotenv.config();

import * as config from './configs'; 

import express, {Application} from 'express';

import { prepareApis, PreparedApis } from './loaders';
import {createUtils, Utils} from './utils';
import { createModels, Models } from './models';
import { createServices, Services } from './services';
import {createControllers, Controllers} from './controllers';
import { createMiddlewares, Middlewares } from './middlewares';
import {createRouters, Routers} from './routers';

import {Server} from './server';


async function createApp() {
  const utils: Utils = await createUtils(config.utilsConfig);

  const apis: PreparedApis = await prepareApis(config.loadersConfig);
  const models: Models = createModels(apis.db);
  const services: Services = createServices(utils, models);
  const controllers: Controllers = createControllers(services);
  const middlewares: Middlewares = createMiddlewares(controllers);
  const routers: Routers = createRouters(controllers);

  const app: Application = express();
  const server: Server = new Server(app, config.serverConfig, routers, middlewares);
  
  await server.listen();
}

createApp()
  .then(() => {
    console.info(`Server running on port ${config.serverConfig.port}...`);
  })
  .catch((err) => {
    console.error(err);
  })