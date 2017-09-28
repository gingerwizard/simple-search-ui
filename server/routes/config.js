var express = require('express');
var router = express.Router();
var SearchManager = require('../SearchManager')
/* Grab Configuration from ES */
router.get('/', function(req, res, next) {

  res.json(SearchManager.config());
});

module.exports = router;
