import { Db, Collection, ObjectID} from "mongodb";
import { HashedPassword, GoogleAuthUtils, Utils } from "../../utils";
import { emailRegex } from "./constants";
import { FacebookAuthUtils } from "../../utils/facebook-auth";
import { NewUserPayload } from "../../services/auth-service";

interface DefaultUserSchema extends HashedPassword {
  name: string;
  email: string;
}

interface GoogleUserSchema {
  google: true;
  name: string;
  email: string;
}

interface FacebookUserSchema {
  facebook: true;
  name: string;
  email: string;
}

export type UserSchema = DefaultUserSchema | GoogleUserSchema | FacebookUserSchema;

export type UserJsonPayload = UserSchema & {
  _id: string;
}

export class UsersModel {
  collection: Collection<UserSchema>;
  googleAuth: GoogleAuthUtils;
  facebookAuth: FacebookAuthUtils;

  constructor(db: Db, {googleAuth, facebookAuth}: Utils) {
    this.googleAuth = googleAuth;
    this.facebookAuth = facebookAuth;
    this.collection = db.collection<UserSchema>('users');

    this.collection.createIndex({ email: 1 }, { sparse: true, unique: true });
    this.collection.createIndex({ name: 1 }, { unique: true });
  }

  add(user: UserSchema) {
    return this.collection.insertOne(user);
  }

  async findOne(filter: {[key: string]: any}): Promise<UserJsonPayload | null> {
    const result = await this.collection.findOne(filter) as null | (UserSchema & {_id: ObjectID});

    if (result === null) return null;

    const {_id, ...user} = result;

    return {
      _id: _id.toHexString(),
      ...user
    }
  }

  async findByGoogleToken(googleToken: string) {
    const {email} = await this.googleAuth.decodeToken(googleToken);

    return this.findByEmail(email);
  }
  
  async findByFacebookToken(email: string, token: string) {
    const isTokenValid = await this.facebookAuth.validateToken(token);

    if (!isTokenValid) return null;

    return this.findByEmail(email);
  }

  findById(id: string): Promise<UserJsonPayload | null> {
    return this.findOne({_id: new ObjectID(id)});
  }

  findByName(name: string): Promise<UserJsonPayload | null> {
    return this.findOne({name});
  }

  findByEmail(email: string): Promise<UserJsonPayload | null> {
    return this.findOne({email});
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

  validateUser(
    user: Omit<NewUserPayload, 'password'>
  ): Promise<never | void[]> {
    const {name, ...userData} = user;

    const validationPromises: Promise<void>[] = [
      this.validateName(name),
    ];

    if ('email' in userData) {
      const {email} = userData;

      validationPromises.push(this.validateEmail(email));
    }

    return Promise.all(validationPromises);
  }
}