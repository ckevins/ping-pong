const db = require("./database");
const fs = require('fs');
const path = require('path');

function readQueryFile (filename) {
  return fs.readFileSync(path.join(__dirname, filename), 'utf8');
}

async function executeQueryAsync (query, parameters = []) {
  return new Promise((resolve, reject) => {
    db.all(query, parameters, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      
      resolve(rows);
    })
  })
}

module.exports = {
  readQueryFile,
  executeQueryAsync
}