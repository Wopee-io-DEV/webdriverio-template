/// <reference types="@wopee-io/wopee.wdio" />
/// <reference types="@types/mocha" />
import { browser } from '@wdio/globals';

describe('service browsers', () => {
  before(async function () {
    const now = new Date();
    const date = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
    await browser.startSuite(`service browsers-${date}`);
  });

  it('should open website and do the full page screenshot', async () => {
    await browser.startScenario('should open website and do the full page screenshot');

    await browser.trackFullPageScreen({ stepName: 'fullPage' });

    await browser.stopScenario();
  });
  it('should open website and do the screen screenshot', async () => {
    await browser.startScenario('should open website and do the screen screenshot');

    await browser.trackScreen({ stepName: 'screen' });

    await browser.stopScenario();
  });
  it('should open website and do the element screenshot', async () => {
    await browser.startScenario('should open website and do the element screenshot');

    const element = await browser.$('//img[@alt="Wopee"]');

    if (await element.isExisting()) {
      await browser.trackElement({ stepName: 'element', element: element });
    } else {
      console.log('Element does not exist');
    }

    await browser.stopScenario();
  });
  it('should open website and do the image tracking', async () => {
    await browser.startScenario('should open website and do the image tracking');

    const base64Image = await browser.takeScreenshot();
    await browser.trackImage({ stepName: 'image', imageBase64: base64Image });

    await browser.stopScenario();
  });
});