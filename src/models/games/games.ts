import { Db, Collection, ObjectID, Cursor} from "mongodb";
import { GridParams, GeoPolygon, Figure } from "@micelord/grider";

export interface GameSchema {
  name: string;
  description?: string;
  createdBy: {
    _id: string;
    name: string;
  };
  border: grider.GeoJSONPolygon;
  gridConfig: grider.GridConfig;
}

export type GameJsonPayload = GameSchema & {
  _id: string;
}

export interface Game {
  name: string;
  description?: string;
  createdBy: {
    _id: string;
    name: string;
  };
  border: grider.GeoPoint[];
  gridConfig: grider.GridConfig;
  _id: string;
}

export class GamesModel {
  collection: Collection<GameSchema>;

  constructor(db: Db) {
    this.collection = db.collection<GameSchema>('games');

    this.collection.createIndex({border: '2dsphere'});
  }

  async add({border, ...game}: Omit<Game, '_id'>) {
    await this.validateGame({...game, border});

    const dbGame: GameSchema = {
      ...game,
      border: this.toDbBorder(border)
    }

    return this.collection.insertOne(dbGame);
  }

  async findOne(filter: {[key: string]: any}): Promise<Game | null> {
    const result = await this.collection.findOne(filter) as null | (GameSchema & {_id: ObjectID});

    if (result === null) return null;

    const {_id, border, ...game} = result;

    return {
      _id: _id.toHexString(),
      border: this.toClientBorder(border),
      ...game
    }
  }

  async find(filter?: {[key: string]: any}): Promise<Game[]> {
    const result = await this.collection.find(filter) as Cursor<GameSchema & {_id: ObjectID}>;

    if (result === null) return null;

    const games = result.map(({_id, border, ...game}) => ({
      _id: _id.toHexString(), 
      border: this.toClientBorder(border),
      ...game
    }));

    return games.toArray();
  }

  findById(id: string): Promise<Game | null> {
    return this.findOne({_id: new ObjectID(id)});
  }

  async validateName(name: string): Promise<never | void> {
    if (name.length < 3) {
      throw new Error('Name length shouldn\'t be less than 3');
    }
  }

  validateGridConfig({
    cellSize,
    correction,
    type,
  }: grider.GridConfig): never | void {
    if (correction !== 'merc' && correction !== 'none') {
      throw new Error('Correction should be either "none" or "merc"');
    }

    if (type !== 'rect' && type !== 'hex') {
      throw new Error('Grid type should be either "rect" or "hex"');
    }

    if (isNaN(cellSize)) {
      throw new Error('Cell size is required and should be a number');
    }

    if (cellSize < 5) {
      throw new Error('Cell size shouldn\'t be less than 5');
    }

    if (cellSize > 10000000) {
      throw new Error('Cell size shouldn\'t be more than 10000000');
    }
  }

  async validateBorder(
    points: grider.GeoPoint[], 
    gridConfig: grider.GridConfig
  ): Promise<void | never> {
    const gridParams = GridParams.fromConfig(gridConfig);
    const borderPoly = GeoPolygon.fromPlain(points);

    const {
      cells,
      points: intersectionPoints
    } = await Figure.validateShape(borderPoly, gridParams);

    if (intersectionPoints.length > 0) {
      throw new Error('Border shouldn\'t intersect itself');
    }

    if (cells.length > 0) {
      throw new Error('Border points should be further from each other');
    }
  }

  async validateGame({
    name,
    gridConfig,
    border,
  }: Omit<Game, '_id'>) {
    this.validateName(name);
    this.validateGridConfig(gridConfig);

    await this.validateBorder(border, gridConfig);
  }

  toDbBorder(border: grider.GeoPoint[]): grider.GeoJSONPolygon {
    return GeoPolygon.fromPlain(border).toGeoJSON();
  }

  toClientBorder(border: grider.GeoJSONPolygon): grider.GeoPoint[] {
    return GeoPolygon.fromGeoJSON(border).toPlain();
  }
}