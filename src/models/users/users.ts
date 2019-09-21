import { Db, Collection, ObjectID} from "mongodb";
import { HashedPassword } from "../../utils";

export interface UserSchema extends HashedPassword {
  name: string;
  email: string;
}

export interface UserJsonPayload extends UserSchema {
  _id: string;
}

export class UsersModel {
  collection: Collection<UserSchema>;

  constructor(db: Db) {
    this.collection = db.collection<UserSchema>('users');

    this.collection.createIndex({ email: 1 }, { sparse: true, unique: true });
    this.collection.createIndex({ name: 1 }, { unique: true });
  }

  add(user: Omit<UserSchema, '_id'>) {
    return this.collection.insertOne(user);
  }
  
  findById(id: string): Promise<UserJsonPayload> {
    return this.collection.findOne({_id: new ObjectID(id)});
  }

  findByName(name: string): Promise<UserJsonPayload> {
    return this.collection.findOne({name});
  }

  findByEmail(email: string): Promise<UserJsonPayload> {
    return this.collection.findOne({email});
  }
}