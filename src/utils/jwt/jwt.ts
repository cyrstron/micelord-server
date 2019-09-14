import jwt from 'jsonwebtoken';

export interface JwtSettings {
  privateKey: string;
  publicKey: string;
  expiration: string,
  encryption:  string,
  issuer: string,
  audience: string,
}

export class JwtUtils {
  privateKey: string;
  publicKey: string;
  expiration: string;
  encryption:  string;
  issuer: string;
  audience: string;

  constructor({
    privateKey,
    publicKey,
    expiration,
    encryption,
    issuer,
    audience,
  }: JwtSettings) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.expiration = expiration;
    this.encryption = encryption;
    this.issuer = issuer;
    this.audience = audience;
  }

  sign(
    payload: string | object | Buffer
  ): Promise<string> {
    return new Promise((res, rej) => {
      jwt.sign(payload, this.privateKey, {
        expiresIn: this.expiration,
        algorithm:  this.encryption,
        issuer: this.issuer,
        audience: this.audience
      }, (err, token) => {
        if (err) {
          rej(err);
        } else {
          res(token);
        }
      })
    });
  }

  verify<Payload extends object>(
    token: string,
  ): Promise<Payload> {
    return new Promise((res, rej) => {
      jwt.verify(token, this.publicKey, {
        issuer: this.issuer,
        audience: this.audience,
      }, (err, payload) => {
        if (err) {
          rej(err);
        } else {
          res(payload as Payload);
        }
      })
    });
  }
}