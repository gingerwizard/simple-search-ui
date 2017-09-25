var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "dalem"
  }, {
  	id: 2,
  	username: "asawari"
  }]);
});

module.exports = router;
