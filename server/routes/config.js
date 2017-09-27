var express = require('express');
var router = express.Router();

/* Grab Configuration from ES */
router.get('/', function(req, res, next) {

  res.json({"config":{}});
});

module.exports = router;
