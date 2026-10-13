# Wopee.io WebdriverIO project

This repository is a WebdriverIO project connected to Wopee.io. It contains one sample test that opens your app, waits until the page is ready and sends a full-page screenshot to Wopee.io. The first run stores the screenshot as the baseline; every later run is compared against it, and you approve or reject each difference in Commander. Start from the sample and add your own checks.

## Run in GitHub Actions

No setup needed. When Wopee.io created this repository it stored the `WOPEE_API_KEY` secret and the `WOPEE_PROJECT_UUID`, `WOPEE_PROJECT_URL` and `WOPEE_API_URL` variables (Settings › Secrets and variables › Actions), and the workflow uses them.

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

- **Your app:** the sample opens `WOPEE_PROJECT_URL`, the App URL you entered when you created the project. Change it in `.env` for local runs; for GitHub Actions, change the App URL in Commander or the `WOPEE_PROJECT_URL` variable in Settings › Secrets and variables › Actions › Variables.
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
- **`put-your-project-uuid-here` in `.env`**: you copied the public template instead of using the repository Wopee.io created. Fill in `WOPEE_PROJECT_UUID` (the `projectId` in the Commander address bar) and `WOPEE_PROJECT_URL` (your app).
- **`Wopee API rejected the request: 401 Unauthorized`**: the API key usually belongs to another Wopee.io instance or project, or was deleted. Generate a new key in this project. `WOPEE_API_URL` is only for self-hosted instances; leave it out for cmd.wopee.io (the default is `https://api.wopee.io`).
- **Rotated or narrow screenshots**: keep `isLandscape: false` in `wdio.conf.ts`; `true` is meant for mobile devices in landscape.
