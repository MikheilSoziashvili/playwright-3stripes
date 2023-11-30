const RPconfig = {
  // @ts-ignore
  token: process.env.RP_TOKEN, //Do not modify - Env variable passed in jenkinsFile
  endpoint: "https://testreportingportal.tools.3stripes.net/api/v1", //Do not modify
  project: process.env.RP_PROJECT, //Do not modify - Env variable passed in jenkinsFile
  launch: "Jenkins test", //Update as per you needs
  description: process.env.RP_DESCRIPTION, //Do not modify - Env variable passed in jenkinsFile
  includeTestSteps: true, //Do not modify
};

module.exports = { RPconfig };
