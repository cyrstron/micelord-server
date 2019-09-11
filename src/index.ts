import * as dotenv from 'dotenv';
import express from 'express';
import {MongoClient} from 'mongodb';

import {Controllers, createControllers} from './controllers';
import {createRouters, Routers} from './routers';
import {Server} from './server';

dotenv.config();

const PORT = +process.env.PORT || 3001;

const app: express.Application = express();

const controllers: Controllers = createControllers();
const router: Routers = createRouters(controllers);
const server: Server = new Server(app, router);

const client = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

let collection: any;

client.connect()
  .then(() => {
    const db = client.db('micelord');

    collection = db.collection('documents');

    return collection.drop();
  })
  .then(() => {
    return collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ]);
  })
  .then((result) => {    
    console.log(result)
    console.log("Inserted 3 documents into the collection");
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    client.close();
  });

server.listen(PORT)
  .then((): void => {
    console.info(`Server is listening on ${PORT} port`);
  })
  .catch((err: Error): void => {
    console.error(err);
  });
