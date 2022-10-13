const path = require('path');
const express = require('express');

const adminRoutes = require(path.join(__dirname, 'routes', 'admin.js'))
const feedRoutes = require(path.join(__dirname, 'routes', 'feed.js'));

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use("/admin", adminRoutes);
app.use(feedRoutes);

app.use((req, res, next) => {
  res.status(404)
     .sendFile(path.join(__dirname, 'views', '404.html'));
})


app.listen(3000);