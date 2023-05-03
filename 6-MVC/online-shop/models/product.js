const fs = require('fs');
const path = require('path');
const p = path.join(
  path.dirname(process.mainModule.filename), 
  'data', 
  'products.json'
);

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if(err) return callback([]);
    const files = JSON.parse(fileContent);
    callback(files);
  })
}

module.exports = class Product {
  constructor(title) {
    this.title = title; 

  }

  store() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    })
  }

  getProduct() {
    return this; 
  }

  static fetchAll(callback) {
    getProductsFromFile(callback)
  }
}