var express = require('express');
var router = express.Router();
var rotonde = require('../rotonde/rotonde');
var promenadePath = "http://promenade.nanoleptic.net/";


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.headers.hasOwnProperty("accept") && req.headers.accept.includes("text/html")){
    res.writeHead(302, {
      'Location': promenadePath+req.hostname
    });
    res.end();
  } else {
    res.send(JSON.stringify(rotonde.get()))
  }
});

module.exports = router;
