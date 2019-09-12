import {ApiController} from './api';
import {HomeController} from './home';
import { Models } from '../models';

export interface Controllers {
  api: ApiController;
  home: HomeController;
}

export const createControllers = (_models: Models): Controllers => ({
  api: new ApiController(),
  home: new HomeController(),
});

export {
  ApiController,
  HomeController,
};
