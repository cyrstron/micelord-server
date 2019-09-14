import path from "path";

export const utilsConfig = {
  encrypt: {
    saltLength: +process.env.ENCRYPT_SALT_LENGTH,
    encryption: process.env.ENCRYPT_ALGORITHM,
    iterations: +process.env.ENCRYPT_ITERATIONS,
    hashLength: +process.env.ENCRYPT_HASH_LENGTH,
    encoding: 'base64',
  },
  jwt: {    
    privateKeyPath: path.resolve(__dirname, '../../private.key'),
    publicKeyPath: path.resolve(__dirname, '../../public.key'),
    expiration: '24h',
    encryption:  "RS256",
    issuer:  'MiceLord',
    audience:  'http://micelord.blah',
  }
};

export const loadersConfig = {
  mongo: {
    url: process.env.MONGODB_URL,
    dbName: 'micelord',
    options: {    
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }
  },
};

export const serverConfig = {
  port: +process.env.PORT || 3001,
};