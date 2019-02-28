import {ApiController} from './api';
import {HomeController} from './home';

export interface Controllers {
  api: ApiController;
  home: HomeController;
}

export const createControllers = (): Controllers => ({
  api: new ApiController(),
  home: new HomeController(),
});

export {
  ApiController,
  HomeController,
};
