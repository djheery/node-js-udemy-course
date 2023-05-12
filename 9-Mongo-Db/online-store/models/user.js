const getDb = require('../secure/database').getDb;
const mongoDb = require('mongodb'); 
const ObjectId = mongoDb.ObjectId;

class User {
  constructor(username, email) {
    this.username = username; 
    this.email = email; 
  }

  save() {
    const db = getDb(); 
    return db.collection('users')
           .insertOne(this)
           .then(res => res)
           .catch(err => console.log(err));
  }

  static findById(userId) {
    const db = getDb();
    const mongoId = new ObjectId(userId); 
    return db.collection('users').findOne({_id: mongoId});
  }
}

module.exports = User;