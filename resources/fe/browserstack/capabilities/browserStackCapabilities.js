const cp = require("child_process");

/**
 * Extracting client playwright version value
 */
const clientPlaywrightVersion = cp
  .execSync("npx playwright --version")
  .toString()
  .trim()
  .split(" ")[1];

/**  BrowserStack Specific Capabilities.  */
const caps = {
  browser: "chrome",
  os: "osx",
  os_version: "catalina",
  name: "My first playwright test",
  build: "seed-tas-playwright-js" /** Update as required */,
  "browserstack.username":
    process.env.BROWSERSTACK_USERNAME ||
    "" /** Set you credentials as env variables/Jenkins secrets */,
  "browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY || "",
  "browserstack.local": process.env.BROWSERSTACK_LOCAL || false, //set to true for tunneling connection to BS local
  "client.playwrightVersion": clientPlaywrightVersion,
  "browserstack.idleTimeout": "300000",
};

/**
 * BrowserStack Local
 */
const BrowserStackLocal = require("browserstack-local");
const bsLocal = new BrowserStackLocal.Local();

const BS_LOCAL_ARGS = {
  key: process.env.BROWSERSTACK_ACCESS_KEY || "", //environment variable -set YOUR_ACCESS_KEY  as "BROWSERSTACK_ACCESS_KEY"
};

/**  Patching the capabilities dynamically according to the project name.
 * !!Do NOT Modify!!!
 *
 * */

const patchCaps = (name, title) => {
  let combination = name.split(/@browserstack/)[0];
  let [browerCaps, osCaps] = combination.split(/:/);
  let [browser, browser_version] = browerCaps.split(/@/);
  let osCapsSplit = osCaps.split(/ /);
  let os = osCapsSplit.shift();
  let os_version = osCapsSplit.join(" ");
  caps.browser = browser ? browser : "chrome";
  caps.browser_version = browser_version ? browser_version : "latest";
  caps.os = os ? os : "osx";
  caps.os_version = os_version ? os_version : "catalina";
  caps.name = title;
};

/**
 * Do NOT Modify!!!!
 *
 */
const isHash = (entity) =>
  Boolean(entity && typeof entity === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) =>
  keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);
const isUndefined = (val) => val === undefined || val === null || val === "";
const evaluateSessionStatus = (status) => {
  if (!isUndefined(status)) {
    status = status.toLowerCase();
  }
  if (status === "passed") {
    return "passed";
  } else if (status === "failed" || status === "timedout") {
    return "failed";
  } else {
    return "";
  }
};

module.exports = {
  caps,
  patchCaps,
  isHash,
  nestedKeyValue,
  evaluateSessionStatus,
  BS_LOCAL_ARGS,
  BrowserStackLocal,
  bsLocal,
};
