import { Db, Collection, ObjectID} from "mongodb";
import { HashedPassword } from "../../utils";
import { emailRegex } from "./constants";
import { NewUser } from "../../services";

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

  findByEmail(email: string): Promise<UserJsonPayload | undefined> {
    return this.collection.findOne({email});
  }

  async validateEmail(email: string): Promise<never | void> {
    const isValid = emailRegex.test(email);

    if (!isValid) {
      throw new Error('Email is not valid');
    }

    const user = await this.findByEmail(email);

    if (user) {      
      throw new Error('Email is already exists');
    }

    return;
  }

  async validateName(name: string): Promise<never | void> {
    if (name.length < 3) {
      throw new Error('Name length shouldn\'t be less than 3');
    } 

    const user = await this.findByName(name);

    if (user) {
      throw new Error('Name is already exists');
    }
  }

  validateUser({email, name}: Omit<NewUser, 'password'>): Promise<never | void[]> {
    return Promise.all([
      this.validateEmail(email),
      this.validateName(name),
    ]);
  }
}