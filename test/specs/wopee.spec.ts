import { browser, $ } from "@wdio/globals";

const now = new Date();
const pad = (n: number) => String(n).padStart(2, "0");
const suiteName = `WebdriverIO sample ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

describe(suiteName, () => {
  before(async () => {
    await browser.startSuite(suiteName);
  });

  it("Home page", async () => {
    await browser.startScenario("Home page");

    // WOPEE_PROJECT_URL is the App URL of your Wopee.io project (see .env)
    await browser.url(
      process.env.WOPEE_PROJECT_URL || browser.options.baseUrl!,
    );
    await browser.pageReady();
    await browser.trackFullPageScreen({ stepName: "Home page" });

    // Add a check after an interaction: act, wait for the page, track.
    // await $("a=Pricing").click();
    // await browser.pageReady();
    // await browser.trackScreen({ stepName: "Pricing" });

    await browser.stopScenario();
  });
});
