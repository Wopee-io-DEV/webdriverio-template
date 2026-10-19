# WebdriverIO + Wopee.io

This repository is your project's WebdriverIO test suite with Wopee.io visual testing already wired in.
Wopee.io created it when you created the project in [Commander](https://cmd.wopee.io), and filled in your project settings.
The sample test `tests/example.spec.ts` opens your app's URL and takes three screenshots (full page, viewport, and an image you capture yourself) that Wopee.io compares with approved baselines.
Run it as it is first, then grow it into your own tests.

## Run from Commander

Nothing to set up. In Commander open **Runs** › **Start testing**. Commander runs this repository's tests in GitHub Actions with your project settings (the API key is the repository's `WOPEE_API_KEY` secret) and shows the results under Runs.

Want the tests on every push or pull request? Add your own trigger to `.github/workflows/tests.yml`.

## Run locally

Needs Node.js 20 or newer, git and Google Chrome.

```shell
git clone <this repository>
cd <repository folder>
cp .env.example .env
```

Open `.env` and paste an API key after `WOPEE_API_KEY=`. Create one in Commander › More › Settings › API Keys (the key is shown only once).
The other values are already your project's. Keep `.env` out of git; it is in `.gitignore`.

```shell
npm ci
npm test
```

The console prints a `Tracking response` line for each tracked step with its status and a link to it in Commander.

## Review in Commander

Open Commander › Runs and the suite "service browsers-&lt;date&gt; &lt;time&gt;".

- First run: the steps `fullPage`, `screen` and `image` have status **new**. Check the screenshots and **Approve** them; they become the baselines.
- Next runs: a step is **ok** when the page looks the same, or **unresolved** when it differs. Open it to see the difference, then Approve (new baseline) or Reject.

A visual difference is reported in Commander; it does not fail the WebdriverIO test.

## Make it yours

- **Your app:** `baseUrl` in `wdio.conf.ts` is `WOPEE_PROJECT_URL` (the App URL you entered in Commander), so `browser.url('/')` opens your app. Change it in `.env` for local runs; for runs from Commander, change the App URL in Commander.
- **Add a check:** after any interaction, one line tracks another screenshot:

  ```ts
  await browser.trackScreen({ stepName: 'Inventory page' });
  ```

  `trackScreen` captures the viewport, `trackFullPageScreen` the whole page, `trackElement` one element (`element: await browser.$('<selector from your app>').getElement()`). Every `stepName` in a scenario gets its own baseline.

- **More tests:** add `*.spec.ts` files under `tests/` and list them in `specs` in `wdio.conf.ts`. `tests/example.spec.ts` shows what every test needs: start a suite and a scenario, track, stop the scenario.
- **Desktop screenshots:** keep `isLandscape: false` in `wdio.conf.ts`; `true` is for mobile devices in landscape and rotates desktop screenshots.

## Add Wopee.io to an existing WebdriverIO project

Follow [WebdriverIO visual testing](https://docs.wopee.io/webdriverio-visual-testing/) in the Wopee.io docs.

## Troubleshooting

- **`Failed to initialise service @wopee-io/wopee.wdio: WopeeError` with `"apiKey"` … `"missing"`**: `.env` is missing or a value is empty. Run `cp .env.example .env` and paste the API key.
- **`ZodError ... Expected object, received null`** or an authorization error: the API key usually belongs to another Wopee.io instance (or another project). Create the key in the Commander you run against. `WOPEE_API_URL` is only for self-hosted instances; leave it out for cmd.wopee.io (the default is `https://api.wopee.io`).
- **`Error: Unsupported type: function` from `trackElement`**: the selector matched nothing on the page. Use a selector from your app.
- **A local run is unresolved against a baseline from Commander:** expected; your screen scale and fonts differ from Commander's runner. Keep the baseline from one place (usually Commander) and do not approve local screenshots over it, or allow small differences with `WOPEE_PIXEL_TO_PIXEL_DIFF_TOLERANCE` in `.env`.
- **`put-your-project-uuid-here` in `.env`**: you cloned the public template, not your project's repository. Put in your project UUID from Commander › More › Settings › API Keys (`WOPEE_PROJECT_UUID`) and your app's URL (`WOPEE_PROJECT_URL`).
