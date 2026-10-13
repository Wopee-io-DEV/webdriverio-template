import { browser, $ } from "@wdio/globals";

// One scenario per Wopee.io track command. Run with: npm run test:examples
const appUrl = () => process.env.WOPEE_PROJECT_URL || browser.options.baseUrl!;

describe(`WebdriverIO track commands ${new Date().toISOString().slice(0, 16).replace("T", " ")}`, () => {
  before(async function () {
    await browser.startSuite(this.test!.parent!.title);
  });

  beforeEach(async () => {
    await browser.url(appUrl());
    await browser.pageReady();
  });

  afterEach(async () => {
    await browser.stopScenario();
  });

  it("Full page", async () => {
    await browser.startScenario("Full page");
    await browser.trackFullPageScreen({ stepName: "Full page" });
  });

  it("Viewport", async () => {
    await browser.startScenario("Viewport");
    await browser.trackScreen({ stepName: "Viewport" });
  });

  it("Element", async () => {
    await browser.startScenario("Element");
    // Replace "body" with a selector from your app. WDIO 9 types `$()` as a chainable
    // that does not narrow on await; `getElement()` is how v9 hands back a real element.
    const element = await $("body").getElement();
    await browser.trackElement({ stepName: "Element", element });
  });

  it("Image", async () => {
    await browser.startScenario("Image");
    const imageBase64 = await browser.takeScreenshot();
    await browser.trackImage({ stepName: "Image", imageBase64 });
  });
});
