const fs = require('fs');
const path = require('path');

function readFile (filename) {
  return fs.readFileSync(path.join(__dirname, filename), 'utf8');
}

module.exports = {
  readFile
}