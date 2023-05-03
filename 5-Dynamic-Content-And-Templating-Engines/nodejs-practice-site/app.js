const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop')

const app = express();

// app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout'}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 
    "404: Whoops Page Not Found", 
    heading: "Whoops, You're page is not found!"
  })
})

app.listen(3000);
