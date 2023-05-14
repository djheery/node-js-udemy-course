const getDb = require('../secure/database').getDb;
const mongoDb = require('mongodb'); 
const ObjectId = mongoDb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.username = username; 
    this.email = email; 
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb(); 
    return db.collection('users')
           .insertOne(this)
           .then(res => res)
           .catch(err => console.log(err));
  }

  addToCart(product) {
    const cartProduct = this.cart.items.findIndex(i => {
      return i.productId.toString() === product._id.toString()
    });
    let newQuantity = 1; 
    const updatedCartItems = [...this.cart.items];
    if(cartProduct >= 0) {
      newQuantity = this.cart.items[cartProduct].quantity + 1;
      updatedCart[cartProduct].quantity = newQuantity; 
    } else {
      updatedCartItems.push(
        {
          productId: new ObjectId(product._id), 
          quantity: newQuantity
        })
    }

    const updatedCart = { items: updatedCartItems }
    const db = getDb(); 
    return db.collection('users').updateOne(
      { _id: new ObjectId(this._id)},
      { $set: {cart: updatedCart}}
    )

  }

  static findById(userId) {
    const db = getDb();
    const mongoId = new ObjectId(userId); 
    return db.collection('users').findOne({_id: mongoId});
  }
}

module.exports = User;