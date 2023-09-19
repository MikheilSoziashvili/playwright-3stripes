const cp = require("child_process");
const playwrightClientVersion = cp
  .execSync("npx playwright --version")
  .toString()
  .trim()
  .split(" ")[1];

const moonConfigs = {
  // @ts-ignore
  playwrightVersion: playwrightClientVersion,
  projectNameMoon: "seed-tas-playwright-js" /** Update as required */,
  headlessMoon: false /** Refer documentation - UserGuide/02-FeMoon for options  */,
  enableVideoMoon: false,
  pattern:
    process.env
      .PW_S3_FOLDER_LOCAL /** S3 bucket folder name if enableVideoMoon is set to true*/,
};

module.exports = { moonConfigs };
