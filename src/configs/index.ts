export const mongoConfig = {
  url: process.env.MONGODB_URL,
  dbName: 'micelord',
  launchOptions: {    
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }
}