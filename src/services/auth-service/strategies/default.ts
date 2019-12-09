import { UsersModel } from "../../../models";
import { EncryptUtils } from "../../../utils";

export class DefaultAuthStrategy {
  constructor(
    private users: UsersModel,
    private encrypt: EncryptUtils
  ) {}

  async validate(email: string, password: string) {    
    const user = await this.users.findByEmail(email);

    if (!user || !('hash' in user)) {
      throw new Error('Invalid creadentials');
    }

    const {
      hash,
      salt,
      iterations,
      ...userData
    } = user;

    const isValid = await this.encrypt.validatePassword(password, {      
      hash,
      salt,
      iterations,
    });
  
    if (!isValid) throw new Error('Invalid creadentials');

    return userData;
  }

  async create({
    email,
    name,
    password,
  }: {
    email: string, 
    password: string, 
    name: string
  }) {
    const {hash, salt, iterations} = await this.encrypt.encryptPassword(password);

    return {
      email,
      name,
      hash, 
      salt, 
      iterations,
    }
  }
}