import { Db, Collection} from "mongodb";
import { HashedPassword } from "../../utils";

interface DefaultUserSchema extends HashedPassword {
  name: string;
  email: string;
}

interface GoogleUserSchema {
  google: true;
  name: string;
  email: string;
}

export type UserSchema = DefaultUserSchema | GoogleUserSchema;

export type UserJsonPayload = UserSchema & {
  _id: string;
}

export class RolesModel {
  collection: Collection<UserSchema>;

  constructor(db: Db) {
    this.collection = db.collection<UserSchema>('roles');

    this.collection.createIndex({ name: 1 }, { unique: true });
  }
}