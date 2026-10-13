import "dotenv/config";

export const config: WebdriverIO.Config = {
  runner: "local",
  specs: ["./test/specs/**/*.ts"],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--headless=new",
          "--window-size=1280,900",
          "--no-sandbox",
          "--disable-gpu",
        ],
      },
    },
  ],
  logLevel: "warn",
  bail: 0,
  baseUrl: process.env.WOPEE_PROJECT_URL || "https://wopee.io",
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
        },
        isLandscape: false,
      },
    ],
  ],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    timeout: 120000,
  },
  before() {
    // Waits until web fonts and images are loaded, so a screenshot never catches a half-rendered page.
    browser.addCommand("pageReady", async function (this: WebdriverIO.Browser) {
      await this.waitUntil(
        () => this.execute(() => document.readyState === "complete"),
        { timeout: 30000 },
      );
      await this.execute(async () => {
        const images = [...document.images].filter(
          (img) => img.complete || img.loading !== "lazy",
        );
        const ready = Promise.all([
          document.fonts.ready,
          ...images.map((img) => img.decode().catch(() => {})),
        ]);
        await Promise.race([
          ready,
          new Promise((resolve) => setTimeout(resolve, 10000)),
        ]);
      });
    });
  },
};

declare global {
  namespace WebdriverIO {
    interface Browser {
      pageReady(): Promise<void>;
    }
  }
}
