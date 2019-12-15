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
      parseJson,
      handleError,
      staticServer,
    }: Middlewares
  ) {
    this.port = config.port;

    const {
      auth,
      api,
    } = routers;

    app.use(parseJson);
    app.use('/static', staticServer);

    app.use('/auth', auth);
    
    app.use('/api', api);

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
