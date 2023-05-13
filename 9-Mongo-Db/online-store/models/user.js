const getDb = require('../secure/database').getDb;
const mongoDb = require('mongodb'); 
const ObjectId = mongoDb.ObjectId;

class User {
  constructor(username, email, cart) {
    this.username = username; 
    this.email = email; 
    this.cart = cart;
  }

  save() {
    const db = getDb(); 
    return db.collection('users')
           .insertOne(this)
           .then(res => res)
           .catch(err => console.log(err));
  }

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex(i => i._id === product._id);
  }

  static findById(userId) {
    const db = getDb();
    const mongoId = new ObjectId(userId); 
    return db.collection('users').findOne({_id: mongoId});
  }
}

module.exports = User;