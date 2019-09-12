import { Db, Collection } from "mongodb";

export interface UserSchema {
  name: string;
  email: string;
}

export class UsersModel {
  collection: Collection<UserSchema>;

  constructor(db: Db) {
    this.collection = db.collection<UserSchema>('users');
  }

  add(user: UserSchema) {
    return this.collection.insertOne(user);
  }
  
  findById(id: string) {
    return this.collection.findOne({id});
  }

  findByName(name: string) {
    return this.collection.findOne({name});
  }
}