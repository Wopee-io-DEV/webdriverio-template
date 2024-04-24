import { browser } from '@wdio/globals';

describe('service browsers', () => {
  it('should open website and do the full page screenshot', async () => {
    browser.setTimeout({ implicit: 10000 });
    await browser.setWindowSize(1920, 1080);
    await browser.url('https://dronjo.wopee.io');
    await browser.trackFullPageScreen('fullPage');
  });
  it('should open website and do the screen screenshot', async () => {
    browser.setTimeout({ implicit: 10000 });
    await browser.setWindowSize(1920, 1080);
    await browser.url('https://dronjo.wopee.io');
    await browser.trackScreen('screen');
  });
  it('should open website and do the element screenshot', async () => {
    browser.setTimeout({ implicit: 10000 });
    await browser.setWindowSize(1920, 1080);
    await browser.url('https://dronjo.wopee.io');
    const element = await browser.$('#navbarNav');
    await browser.trackElement('element', element);
  });
  it('should open website and do the image tracking', async () => {
    browser.setTimeout({ implicit: 10000 });
    await browser.setWindowSize(1920, 1080);
    await browser.url('https://dronjo.wopee.io');
    const base64Image = await browser.takeScreenshot();
    await browser.trackImage('image', base64Image);
  });
});