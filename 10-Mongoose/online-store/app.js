const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');
const MONGO_DB_URL = require('./util/database').MONGO_DB_URL

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('645e7af1eef994fd5f531933')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGO_DB_URL
  )
  .then(result => {
    User.findOne().then(user => {
      if(!user) {
        const user = new User({
          name: 'Daniel Heery',
          email: 'heery@live.co.uk',
          cart: {
            items: []
          }
        })
      }
    })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
