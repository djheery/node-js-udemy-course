const path = require('path');
const express = require('express');
const __rootdir__ = require('../util/path');

const router = express.Router();

router.get('/staff-page', (req, res, next) => {
  res.sendFile(path.join(__rootdir__, 'views', 'admin.html'));
});

module.exports = router;