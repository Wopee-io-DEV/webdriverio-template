import "dotenv/config";

export const config = {
  runner: "local",
  specs: ["./tests/example.spec.ts"],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--no-sandbox",
          "--disable-infobars",
          "--headless",
          "--disable-gpu",
        ],
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "https://wopee.io",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      "@wopee-io/wopee.wdio",
      {
        screenshotValidation: {
          apiUrl: process.env.WOPEE_API_URL,
          apiKey: process.env.WOPEE_API_KEY,
          projectUuid: process.env.WOPEE_PROJECT_UUID,
          // branchName: process.env.WOPEE_BRANCH_NAME,
          pixelToPixelDiffTolerance:
            process.env.WOPEE_PIXEL_TO_PIXEL_DIFF_TOLERANCE,
          enableSoftAssert: process.env.WOPEE_ENABLE_SOFT_ASSERT,
          // customTags: process.env.WOPEE_CUSTOM_TAGS,
          // ciBuildId: process.env.WOPEE_CI_BUILD_ID,
        },
        isLandscape: true,
      },
    ],
  ],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    timeout: 120000,
  },
};
