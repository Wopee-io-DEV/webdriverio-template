import { browser } from "@wdio/globals";

describe("service browsers", () => {
  before(async () => {
    await browser.startSuite("service browsers");
  });

  it("should open website and do the full page screenshot", async () => {
    await browser.startScenario(
      "should open website and do the full page screenshot"
    );

    await browser.setWindowSize(1920, 1080);
    await browser.url("https://dronjo.wopee.io");
    await browser.trackFullPageScreen("fullPage");

    await browser.stopScenario();
  });
  it("should open website and do the screen screenshot", async () => {
    await browser.startScenario(
      "should open website and do the screen screenshot"
    );

    await browser.setWindowSize(1920, 1080);
    await browser.url("https://dronjo.wopee.io");
    await browser.trackScreen("screen");

    await browser.stopScenario();
  });
  it("should open website and do the element screenshot", async () => {
    await browser.startScenario(
      "should open website and do the element screenshot"
    );

    await browser.setWindowSize(1920, 1080);
    await browser.url("https://dronjo.wopee.io");
    const element = await browser.$(".navbar__brand");
    await browser.trackElement("element", element);

    await browser.stopScenario();
  });
  it("should open website and do the image tracking", async () => {
    await browser.startScenario(
      "should open website and do the image tracking"
    );

    await browser.setWindowSize(1920, 1080);
    await browser.url("https://dronjo.wopee.io");
    const base64Image = await browser.takeScreenshot();
    await browser.trackImage("image", base64Image);

    await browser.stopScenario();
  });
});