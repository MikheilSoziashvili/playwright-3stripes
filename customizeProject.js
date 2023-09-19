const readline = require("readline");
var fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const FE_FILES = [
  "configFiles/FE",
  "resources",
  "test-data/wiktionary-test-data.js",
  "tests/FE",
  "tests/MobileDevice-Emulation",
  "tests/RealAndroid-BSBeta",
];
const MOBILE_DEVICES_FILES = [
  "configFiles/FE/MobileDeviceEmulation",
  "configFiles/FE/RealAndroidDevices",
  "resources/fe/browserstack/beta_realAndroidDevices",
  "tests/MobileDevice-Emulation",
  "tests/RealAndroid-BSBeta",
];
const MOON_FILES = ["configFiles/FE/Moon", "resources/fe/moon"];

const BS_FILES = [
  "configFiles/FE/BrowserStack",
  "resources/fe/browserstack",
  "configFiles/FE/RealAndroidDevices",
];

//   const VISUAL_COMPARISON=[
//     'tests/FE/examples/visualComparison.spec.js'
//   ]

const BE_FILES = [
  "configFiles/BE",
  "test-data/example-BE-test-data.js",
  "tests/BE",
];

const MOCK_API_FILES = ["tests/MockAPIs"];

const KAFKA_FILES = ["tests/Kafka"];

const questionsForUser = [
  "Do you want to execute FE tests?(y/n): ",
  "Do you want to execute BE tests?(y/n): ",
  "Do you want to Mock APIs?(y/n): ",
  "Do you want to test Kafka Communications?(y/n): ",
];

const feInfraQuestions = [
  // 'Do you want to execute FE tests on Moon?(y/n): ',
  // 'Do you want to execute FE tests on BrowserStack?(y/n): ',
  "Do you want to execute FE tests on Mobile Devices(Real or Emulated)?(y/n): ",
];

const questions = new Map();
questions.set("Do you want to execute FE tests?(y/n): ", FE_FILES);
questions.set(
  "Do you want to execute FE tests on Mobile Devices(Real or Emulated)?(y/n): ",
  MOBILE_DEVICES_FILES
);
questions.set("Do you want to execute FE tests on Moon?(y/n): ", MOON_FILES);
questions.set(
  "Do you want to execute FE tests on BrowserStack?(y/n): ",
  BS_FILES
);
questions.set("Do you want to execute BE tests?(y/n): ", BE_FILES);
questions.set("Do you want to Mock APIs?(y/n): ", MOCK_API_FILES);
questions.set("Do you want to test Kafka Communications?(y/n): ", KAFKA_FILES);

let skipInfraQuestion = false;

const question = (askQuestion) => {
  return new Promise((resolve, reject) => {
    rl.question(askQuestion, (userResponse) => {
      if (
        userResponse.toLowerCase() == "no" ||
        userResponse.toLowerCase() == "n"
      ) {
        if (askQuestion == "Do you want to execute FE tests?(y/n): ") {
          skipInfraQuestion = true;
        }

        //deleting each file
        for (const each of questions.get(askQuestion)) {
          fs.rmSync(each, { recursive: true });
        }
      }
      resolve();
    });
  });
};

const main = async () => {
  try {
    for (const each of questionsForUser) {
      if (each == "Do you want to execute FE tests?(y/n): ") {
        await question(each);
        //console.log(skipInfraQuestion)
        if (!skipInfraQuestion) {
          for (const setupInfra of feInfraQuestions) {
            await question(setupInfra);
          }
        }
      } else {
        await question(each);
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    rl.close();
    console.log(
      "\x1b[32m%s\x1b[0m",
      ` ✔ Customization complete! Happy testing! 🎭`
    );
    console.log("\n");
  }
};

main();
