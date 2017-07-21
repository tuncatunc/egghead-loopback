//const mongoDbUrl = process.env.MONGO_URL;
// mongodb atlas
//const mongoDbUrl = 'mongodb://tuncatunc:3floyd13@cluster0-shard-00-00-eovcr.mongodb.net:27017,cluster0-shard-00-01-eovcr.mongodb.net:27017,cluster0-shard-00-02-eovcr.mongodb.net:27017/product?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const mongoDbUrl = 'mongodb://tunca:3floyd13@ds115493.mlab.com:15493/product'

if (mongoDbUrl){
  console.log('Using mongodb url:', mongoDbUrl);
}

const dataSources = {
  db: {
    name: 'db',
    connector: 'mongodb',
    url: mongoDbUrl
  }
};

module.exports = dataSources;