// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const wp = require('@cypress/webpack-preprocessor');

module.exports = on => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js']
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ]
      }
    }
  };
  on('file:preprocessor', wp(options)),
    on('before:browser:launch', (browser = {}, args) => {
      // browser will look something like this
      // {
      //   name: 'chrome',
      //   displayName: 'Chrome',
      //   version: '63.0.3239.108',
      //   path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      //   majorVersion: '63'
      // }

      if (browser.name === 'chrome') {
        // `args` is an araay of all the arguments
        // that will be passed to Chrome when it launchers
        args.push('--disable-gpu', '--window-size=800,600');

        // whatever you return here becomes the new args
        return args;
      }

      if (browser.name === 'electron') {
        // `args` is a `BrowserWindow` options object
        // https://electronjs.org/docs/api/browser-window#new-browserwindowoptions
        args['fullscreen'] = true;

        // whatever you return here becomes the new args
        return args;
      }
    });
};
