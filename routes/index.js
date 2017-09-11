var express = require('express');
var router = express.Router();
var rotonde = require('../rotonde/rotonde');
var promenadePath = "http://promenade.nanoleptic.net/";


/* GET home page. */
router.get('/', function(req, res, next) {
  simpleGet(req, res, next);
});

router.get('/by-id/:id', function(req, res, next){
  var rtnd = rotonde.get();
  rtnd.feed = rtnd.feed.filter(function(entry){
    return entry.id == req.params.id;
  });
  if (rtnd.feed.length!=1){
    if (rtnd.feed<1){
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(500);
      res.send("Multiple posts with this ID, please let the owner of this Rotonde know about this");
    }
  } else {
    rtnd.feed.sort(function(a,b){
      console.log(a);
      return b.time-a.time;
    });
    res.send(rtnd);
  }
});

function simpleGet(req, res, next) {
  if (req.headers.hasOwnProperty("accept") && req.headers.accept.includes("text/html")){
    res.writeHead(302, {
      'Location': promenadePath+req.hostname
    });
    res.end();
  } else {
    var rtnd = rotonde.get();
    rtnd.feed.sort(function(a,b){
      console.log(a);
      return b.time-a.time;
    });
    rtnd.feed = rtnd.feed.slice(0,30);
    res.send(JSON.stringify(rtnd))
  }
}

router.post('/post', function(req, res, next){
  authorise(req, res, function(){
    var text = req.body.text;
    var options = req.body.options;
    var success = rotonde.post(text, options);
    if (success=="200") {
      simpleGet(req, res, next);
    } else {
      next(e);
    }
  });
});


function authorise(req, res, cb){
  // console.log(req);   // debug dump the request

  // If they pass in a basic auth credential it'll be in a header called "Authorization" (note NodeJS lowercases the names of headers in its request object)

  var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
  console.log("Authorization Header is: ", auth);

  if(!auth) {     // No Authorization header was passed in so it's the first time the browser hit us

    // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
    // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

    res.end('--noauth--');
  }

  else if(auth) {    // The Authorization was passed in so now we validate it

    var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

    var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
    var plain_auth = buf.toString();        // read it back out as a string

    console.log("Decoded Authorization ", plain_auth);

    // At this point plain_auth = "username:password"

    var creds = plain_auth.split(':');      // split on a ':'
    var username = creds[0];
    var password = creds[1];

    if((username == process.env.USERNAME) && (password == process.env.PASSWORD)) {   // Is the username/password correct?
      cb();
    }
    else {
      res.statusCode = 401; // Force them to retry authentication
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

      // res.statusCode = 403;   // or alternatively just reject them altogether with a 403 Forbidden

      res.end('--badauth--');
    }
  }
}


module.exports = router;
