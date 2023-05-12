const mongodb = require("mongodb"); 
const MongoClient = mongodb.MongoClient; 
const url = 'YOUR URL WITH PASSWORD';

const connect = (callback) => {
  MongoClient.connect(url)
             .then(res => callback())
             .catch(err => console.log(err))

}
