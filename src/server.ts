import {Application} from 'express';
import {Routers} from './routers';

export class Server {
  constructor(
    private app: Application,
    routers: Routers,
  ) {
    const {
      home,
      api,
    } = routers;

    app.use('/', home);
    app.use('/api', api);
  }

  public listen(port: number) {
    return new Promise<void>((res, rej) => {
      this.app
        .listen(port, res)
        .on('error', rej);
    });
  }
}
