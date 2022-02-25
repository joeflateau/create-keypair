const shebang = require('rollup-plugin-preserve-shebang');

// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    return {
      ...config,
      plugins: [shebang(), ...config.plugins],
    }; // always return a config.
  },
};
