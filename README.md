# Wopee.io WebdriverIO project

This repository is a WebdriverIO project connected to Wopee.io. It contains one sample test that opens your app, waits until the page is ready and sends a full-page screenshot to Wopee.io. The first run stores the screenshot as the baseline; every later run is compared against it, and you approve or reject each difference in Commander. Start from the sample and add your own checks.

## Run in GitHub Actions

No setup needed. When Wopee.io created this repository it stored the API key as the `WOPEE_API_KEY` secret and wrote the project settings to `.github/workflows/.env`.

1. Open the **Actions** tab and select **Run WebdriverIO tests**.
2. Click **Run workflow**.

Runs started from Commander use the same workflow.

## Run locally

Requires Node.js 20 or newer and Google Chrome (WebdriverIO downloads the matching ChromeDriver on the first run).

```shell
git clone <this repository>
cd <repository folder>
cp .env.example .env
```

Open `.env` and paste an API key into `WOPEE_API_KEY`. Generate one in Commander › **More** › **Settings** › **API Keys**. The other values are already filled in. Then:

```shell
npm ci
npm test
```

`.env` is ignored by git; never commit your API key.

## Review in Commander

Open your project in [Commander](https://cmd.wopee.io) › **Runs**. Each run is a suite named `WebdriverIO sample <date time>` with the scenario `Home page`. On the first run every screenshot is new: approve it to make it the baseline. From the second run on, Wopee.io highlights the differences for you to approve or reject.

## Make it yours

- **Your app:** the sample opens `WOPEE_PROJECT_URL`, the App URL you entered when you created the project. Change it in `.env` (local runs) and in `.github/workflows/.env` (GitHub Actions).
- **Add a check:** after an interaction, wait for the page and track it. The sample `test/specs/wopee.spec.ts` has a commented example:

  ```typescript
  await $("a=Pricing").click();
  await browser.pageReady();
  await browser.trackScreen({ stepName: "Pricing" });
  ```

  `trackScreen` captures the viewport, `trackFullPageScreen` the whole page, `trackElement` a single element.

- **More examples:** `test/examples/` shows every track command. Run them with `npm run test:examples`.

## Add Wopee.io to an existing WebdriverIO project

Install `@wopee-io/wopee.wdio`, add the service to `wdio.conf.ts` and call the track commands from your tests: [docs.wopee.io › WebdriverIO](https://docs.wopee.io/webdriverio-visual-testing/).

## Troubleshooting

- **`apiKey: missing`**: `.env` has no `WOPEE_API_KEY`. Paste a key from Commander › More › Settings › API Keys.
- **`apiUrl: must be an absolute URL`**: `.env` still contains `{…}` placeholders, which happens when you copied the public template instead of using the repository Wopee.io created. Fill in `WOPEE_API_URL` (`https://api.wopee.io`), `WOPEE_PROJECT_UUID` (the `projectId` in the Commander address bar) and `WOPEE_PROJECT_URL` (your app).
- **`Wopee API rejected the request: 401 Unauthorized`**: the API key belongs to another project or was deleted. Generate a new key in this project.
- **Rotated or narrow screenshots**: keep `isLandscape: false` in `wdio.conf.ts`; `true` is meant for mobile devices in landscape.
