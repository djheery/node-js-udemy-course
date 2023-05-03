const Product = require('../models/product')

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}

exports.postAddProduct = (req, res, next) => {
  const { title, imgUrl, description, price} = req.body; 
  const product = new Product(
    title, imgUrl, description, price
  );
  product.store();
  res.redirect('/');
}

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      hasProducts: products ? products.length > 0 : false,
      activeShop: true,
      productCSS: true
    });
  });
}