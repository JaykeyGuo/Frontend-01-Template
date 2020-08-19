var express = require('express');
var router = express.Router();
const fs = require('fs');
// const { request } = require('http');

/* GET home page. */
router.post('/', function(request, res, next) {
  fs.writeFileSync(`../server/public/${request.query.filename}`, request.body.content);
  res.end();
});

module.exports = router;
