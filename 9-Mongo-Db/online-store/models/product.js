const getDb = require('../secure/database').getDb;
const mongoDb = require("mongodb")

class Product {
  constructor(id, title, price, description, imageUrl, userId) {
    this._id = id ? new mongoDb.ObjectId(id) : null;
    this.title = title; 
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId
  }

  save() {
    const db = getDb();
    let dbOperation;
    if(this._id) {
      dbOperation = db.collection('products').updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection('products').insertOne(this);
    }
    
    return dbOperation.then(res => console.log(res)).catch(err => console.log(err))
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
             .find()
             .toArray()
             .then(products => products)
             .catch(err => console.log(err))
  }

  static findById(prodId) {
    const db = getDb(); 
    const mId = new mongoDb.ObjectId(prodId);
    return db.collection('products')
             .find({_id: mId})
             .next()
             .then(product => product)
             .catch(err => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDb(); 
    return db.collection('products')
             .deleteOne({_id: new mongoDb.ObjectId(prodId)})
             .then(res => res)
             .catch(err => console.log(err));
  }
}

module.exports = Product;
