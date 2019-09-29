import crypto from 'crypto';

export interface EncryptOptions {
  saltLength: number;
  hashLength: number;
  encryption: string;
  iterations: number;
  encoding: string;
}

export interface HashedPassword {
  hash: string;
  salt: string;
  iterations: number;
}

export class EncryptUtils {
  private saltLength: number;
  private hashLength: number;
  private encryption: string;
  private iterations: number;
  private encoding: string;

  constructor({
    saltLength,
    hashLength,
    encryption,
    iterations,
    encoding,
  }: EncryptOptions) {    
    this.saltLength = saltLength;
    this.hashLength = hashLength;
    this.encryption = encryption;
    this.iterations = iterations;
    this.encoding = encoding;
  }

  private generateSalt(): string {    
    return crypto.randomBytes(this.saltLength)
      .toString(this.encoding);
  }

  private generateHash(
    password: string,
    salt: string,
    iterations: number = this.iterations,
  ): Promise<string> {
    return new Promise((res, rej) => {
      crypto.pbkdf2(
        password, 
        salt, 
        iterations,
        this.hashLength,
        this.encryption,
        (err, hash) => {
          if (err) {
            rej(err);
          } else {
            res(hash.toString(this.encoding))
          }
        }
      );
    })
  }

  async excryptPassword(password: string): Promise<HashedPassword> {
    const salt = this.generateSalt();
    const hash = await this.generateHash(password, salt);

    return {
      salt,
      hash,
      iterations: this.iterations,
    };
  }

  async validatePassword(password: string, {
    hash,
    salt,
    iterations
  }: HashedPassword): Promise<boolean> {
    const testHash = await this.generateHash(password, salt, iterations);

    return hash === testHash;
  }
}