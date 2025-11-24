const db = require("./database");

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
  executeQueryAsync
}