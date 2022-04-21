const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream("src/types/tracker.json");
https.get('https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/tracker.json', function(response) {
  response.pipe(file);
});
