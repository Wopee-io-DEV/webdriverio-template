import { join } from "node:path";

export const config = {
  runner: "local",
  specs: ["./test/test.e2e.js"],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      'goog:chromeOptions': {
          args: [
              '--no-sandbox',
              '--disable-infobars',
              '--headless',
              '--disable-gpu'
          ],
      }
    },
  ],
  logLevel: "debug",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      join(
        process.env.NODE_PATH,
        "@wopee-io/wopee.wdio/build/index.js"
      ),
      {
        screenshotValidation: {
          apiUrl: process.env.WOPEE_API_URL,
          apiKey: process.env.WOPEE_API_KEY,
          projectUuid: process.env.WOPEE_PROJECT_UUID,
          // branchName: process.env.WOPEE_BRANCH_NAME,
          // pixelToPixelDiffTolerance: process.env.WOPEE_PIXEL_TO_PIXEL_DIFF_TOLERANCE,
          // enableSoftAssert: process.env.WOPEE_ENABLE_SOFT_ASSERT,
          // customTags: process.env.WOPEE_CUSTOM_TAGS,
        },
        isLandscape: true,
      },
    ],
  ],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    timeout: 60000,
  },
};