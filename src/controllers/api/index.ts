import {RequestHandler} from 'express';
import centersLiterals from './test-cells.json';

import {Area, GridParams, CenterPoint} from '@micelord/grider';

const params = GridParams.fromConfig({  
  type: 'hex',
  correction: 'merc',
  cellSize: 10000,
  isHorizontal: true,
});

const centers: CenterPoint[] = centersLiterals.map((point) => {
  return CenterPoint.fromPlain(point, params);
})

export class ApiController {
  public handleRequest: RequestHandler = async (_req, res) => {

    const area = await Area.fromCellCenters(centers);

    const points = area.points.map((point) => point.toPlain());

    res.send(points);
  }
}
