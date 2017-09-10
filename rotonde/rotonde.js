var Guid = require('guid');
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);
appDir = path.join(appDir, "..");
var RotondePath = "public/feed.json";

var rotonde = {
  get: function() {
    try {
      return JSON.parse(fs.readFileSync(path.join(appDir, RotondePath)));
    } catch (e) {
      return {};
    }
  },
  put: function(rtnd) {
    try {
      fs.writeFileSync(path.join(appDir, RotondePath), JSON.stringify(rtnd, null, '\t'))
      return "200";
    } catch (e) {
      return e;
    }
  },
  post: function(text, options) {
    console.log("Posting");
    console.log("This: "+text);
    var milliseconds = (new Date).getTime();
    var rtnd = rotonde.get();
    console.log(rtnd);
    var post = {
      text: text,
      time: Math.floor(milliseconds/1000),
      id: Guid.raw()
    };
    if (options){
      post.data = options.data || {}
      if (options.topic)
        post.data.topic = options.topic;
      if (options.task)
        post.data.task = options.task;
      if (options.media)
        post.media = options.media;
      if (options.url)
        post.url = options.url;
    }
      
    rtnd.feed.push(post);
    return rotonde.put(rtnd);
  }
}






module.exports = rotonde;