var express = require('express');
var router = express.Router();

/* Root endpoint */
router.get('/', function(req, res, next) {
  res.json({"service":"simple-search-ui"});
});

module.exports = router;
