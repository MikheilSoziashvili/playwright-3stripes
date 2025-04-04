// global-teardown.js
//const { bsLocal } = require('./resources/fe/browserstack/fixtures/browserStackBrowser');
const { bsLocal } = require('./../capabilities/browserStackCapabilities')

const { promisify } = require('util');
const sleep = promisify(setTimeout);
module.exports = async () => {
  // Stop the Local instance after your test run is completed, i.e after driver.quit
  let localStopped = false;

  if (bsLocal && bsLocal.isRunning()) {
    bsLocal.stop(() => {
      localStopped = true;
      console.log('Stopped BrowserStackLocal');
    });
    while (!localStopped) {
      await sleep(1000);
    }
  }
};
