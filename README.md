# Getting Started with SCRIBOS ValiGate Web SDK

This example project bootstrapped with [Create React App](https://github.com/facebook/create-react-app) shows how to integrate the SCRIBOS ValiGate Web SDK in your own web application.

NOTE: The SCRIBOS ValiGate SDK currently only runs in the mobile Google Chrome browser on Android. For iOS please use our App- and AppClip-SDK. This limitation is due to restrictions on the iOS platform.

## Quick start

- Unzip the file `scribos-valigate-web-sdk-VERSION.zip`
- Change to the root directory of the project `scribos-valigate-web-sdk`
- Run `npm install`
- Enter the valigate application id provided by SCRIBOS into the `initialize` function call in the `App.tsx` file:

  ```
  initialize(
      ...
      "<ENTER_THE_APP_ID_PROVIDED_BY_SCRIBOS_HERE>",
      ...
    );
  ```

- Run `npm start`
- A browser should open automatically and display the http://localhost:3000
  NOTE: The page shows a header, a footer, and an error message UNSUPPORTED_BROWSER

  For further development use an Android Smartphone with Google Chrome.
  Enable development mode on the phone and use port forwarding to access local server
  (https://developer.chrome.com/docs/devtools/remote-debugging/local-server/,
  https://gist.github.com/royshouvik/019b25a2aa9415771a29)

## Contents and structure of the @scribos/valigate npm package

The `@scribos/valigate` npm package is a private package and therefore not available on npm.
It can be used only by companies/partners licensing the SCRIBOS ValiGate Web SDK.

The `@scribos/valigate` npm package is provided as a local package under `./vendor/scribos-valigate-VERSION.tgz`. Unpacking the package reveals the following structure and contents:

```
From scribos-valigate-1.0.4.tgz

├── CHANGELOG.md
├── dist
│   ├── API
│   │   └── reporting.d.ts
│   ├── Decoding
│   │   └── Verify.d.ts
│   ├── index.cjs
│   ├── index.css
│   ├── index.d.ts
│   ├── index.modern.js
│   ├── index.module.js
│   ├── index.umd.js
│   ├── mediaView.d.ts
│   ├── types
│   │   ├── ClientHints.d.ts
│   │   ├── ExitCodes.d.ts
│   │   ├── ReportData.d.ts
│   │   └── ValigateVerify.d.ts
│   └── ua
│       └── support.d.ts
├── LICENSE
├── package.json
├── public
│   ├── comlink_4.3.1.min.js
│   ├── dfreader_wasm.f029c5c.js
│   ├── dfreader_wasm.f029c5c.wasm
│   └── worker.f029c5c.js
├── README.md
└── src
    ├── i18n
    │   └── en.json
    └── styles.css
```

The package is generated with [microbundle](https://github.com/developit/microbundle) and provides build formats ESM (module), UMD and a microbundle-specific MODERN format.

To integrate the local package into your app, just add the following to the dependencies of your `package.json` file:

`"@scribos/valigate": "file:vendor/scribos-valigate-VERSION.tgz"`

(see `package.json` of the example project).

In addition, copy all files in the `public` sub directory of the package to the public directory your application is served from. These files contain the valigate reader code which runs in a worker and are downloaded by the browser on demand.

In `./dist/index.css` (`./src/styles.css` is the corresponding source code with comments) the default styles for the package are defined. They can be customized via CSS custom properties or completely replaced with your own implementation. This is described in more detail below.

Finally, `./src/i18n/en.json` contains the default english texts used in the package.
These can be replaced as described below in the internationalization section.

## @scribos/valigate API

Please see the `README.md` file provided by the `@scribos/valigate` npm package.

## @scribos/valigate styles

Please see the `README.md` file provided by the `@scribos/valigate` npm package.

## @scribos/valigate internationalization (i18n)

Please see the `README.md` file provided by the `@scribos/valigate` npm package.
