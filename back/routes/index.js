var express = require('express');
var router = express.Router();
// const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello World \n');
});

module.exports = router;