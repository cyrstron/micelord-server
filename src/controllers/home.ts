import {RequestHandler} from 'express';

export class HomeController {
  public handleHome: RequestHandler = (_req, res) => {
    res.send('hello world1');
  }
}
