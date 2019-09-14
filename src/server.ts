import {Application} from 'express';
import {Routers} from './routers';
import { Middlewares } from './middlewares';

export interface ServerConfig {
  port: number;
}

export class Server {
  port: number;

  constructor(
    private app: Application,
    config: ServerConfig,
    routers: Routers, {
      verifyToken,
      parseJson,
      handleError
    }: Middlewares
  ) {
    this.port = config.port;

    const {
      auth
    } = routers;

    app.use(parseJson);

    app.use('/', auth);

    app.use(verifyToken);

    app.use(handleError);
  }

  public listen() {
    return new Promise<void>((res, rej) => {
      this.app
        .listen(this.port, res)
        .on('error', rej);
    });
  }
}
