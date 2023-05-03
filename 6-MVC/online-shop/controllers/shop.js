const Product = require('../models/product')

exports.getProducts =  (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/products',
      hasProducts: products ? products.length > 0 : false,
      activeShop: true,
      productCSS: true
    });
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: "Cart Page",
    path: '/cart',
    
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products ? products.length > 0 : false,
      activeShop: true,
      productCSS: true
    });
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: "Checkout",
    path: '/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: "Your Orders!",
    path: '/orders'
  })
}