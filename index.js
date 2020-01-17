const createLighthouse = require('./Lighthouse');
const store = require('./Storage');
const argv = require('yargs').argv;


if(argv.url === undefined){
  console.error('A url is required.');
  process.exit(1);
}

let url = argv.url;
let options = { logLevel: 'info' };

Promise.resolve()
    .then(() => createLighthouse(url, options, null))
    .then(({ chrome, start }) => {
      return start()
          .then((results) => {
            store(results.lhr);
            return chrome.kill().then(() => { console.log('finished running chrome.')})
          })
          .catch((err) => {
            return chrome.kill().then(err => {console.log(err)})
          })
    })
    .catch( err => { console.log(err)});

process.exit();
