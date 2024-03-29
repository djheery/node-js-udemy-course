const e = require('express');
const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id) {
        let existingIndex = products.findIndex(p => p.id === this.id);
        let updatedProducts = [...products];
        updatedProducts[existingIndex] = this; 
        fs.writeFile(p, JSON.stringify(updatedProducts), err => { console.log(err); })
      } else { 
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => { console.log(err); });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(p => p.id != id); 
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchOne(cb, id) {
    getProductsFromFile((products) => {
      const prod = products.find(p => p.id === id);
      cb(prod);
    })
  }
};
