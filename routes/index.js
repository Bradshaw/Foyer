var express = require('express');
var router = express.Router();
var rotonde = require('../rotonde/rotonde')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.headers.hasOwnProperty("accept") && req.headers.accept.includes("text/html"))
    res.render('rotonde', rotonde.get());
  else
    res.send(JSON.stringify(rotonde.get()))
});

module.exports = router;
