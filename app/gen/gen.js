const fs = require('fs');

const t = fs.readFileSync('./tracker.json');
fs.writeFileSync('./src/types/tracker.json',t,{overwrite: true});