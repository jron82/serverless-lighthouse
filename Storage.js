const fs = require('fs');
const randomString = require('random-string');

module.exports = function store(data){

  var content = JSON.stringify(data);
  let filename = randomString({length: 10}) + '.json';

  fs.writeFile(filename, content, (err) => {
    if (err) throw err;

    console.log('Report Saved');
  });
}