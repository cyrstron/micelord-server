import { Db, Collection } from "mongodb";
import { HashedPassword } from "../../utils";

export interface UserSchema extends HashedPassword {
  name: string;
  email: string;
}

export class UsersModel {
  collection: Collection<UserSchema>;

  constructor(db: Db) {
    this.collection = db.collection<UserSchema>('users');

    this.collection.createIndex({ email: 1 }, { sparse: true, unique: true });
    this.collection.createIndex({ name: 1 }, { unique: true });
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

  findByEmail(email: string) {
    return this.collection.findOne({email});
  }

  async findHashedPasswordByEmail(email: string): Promise<HashedPassword | null> {
    const user = await this.findByEmail(email);

    if (!user) return null;

    const {
      hash, 
      salt, 
      iterations
    } = user;

    return {
      hash, 
      salt, 
      iterations
    };
  }
}