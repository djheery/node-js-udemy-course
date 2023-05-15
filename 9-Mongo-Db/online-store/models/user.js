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
    const cartProductIndex = this.cart.items.findIndex(i => {
      return i.productId.toString() === product._id.toString()
    });
    let newQuantity = 1; 
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity; 
    } else {
      updatedCartItems.push(
        {
          productId: new ObjectId(product._id), 
          quantity: newQuantity
        }
      )
    }

    const updatedCart = { items: updatedCartItems }
    const db = getDb(); 
    return db.collection('users').updateOne(
      { _id: new ObjectId(this._id)},
      { $set: {cart: updatedCart}}
    )

  }

  deleteFromCart(productId) {
    const db = getDb()
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString()
    });

    return db.collection('users').updateOne(
      { _id: new ObjectId(this._id)},
      { $set: {cart: {items: updatedCartItems}}}
    )
  }

  addOrder() {
    const db = getDb();
    return this.getCart().then(products => {
      const order = { 
        items: products,
        user: {
          _id: new ObjectId(this._id),
          name: this.name,
        } 
      }
      return db.collection('orders')
               .insertOne(order)
    }).then(res => {
      this.cart = { items:[] }
      return db.collection('users')
            .updateOne( 
              { _id: new ObjectId(this._id) },
              { $set: { cart: { items: [] } } }
            )
    })
  }
 
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => i.productId);
    return db.collection('products')
             .find({_id: {$in: productIds}})
             .toArray()
             .then(p => p.map(p => {
               return {...p, quantity: this.cart.items.find(i => {
                 return i.productId.toString() === p._id.toString()
               }).quantity}
              })); 
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders')
             .find({'user._id': new ObjectId(this._id)})
             .toArray();
  }
 
  static findById(userId) {
    const db = getDb();
    const mongoId = new ObjectId(userId); 
    return db.collection('users').findOne({_id: mongoId});
  }
}

module.exports = User;