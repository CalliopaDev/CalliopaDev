
const base = require("@calliopadev/babel-config/react.babel.config.js")

/**
 * We use the Javascript conifguration format because it allows us to
 * document it.
 * 
 * see {@link https://babeljs.io/docs/en/configuration#javascript-configuration-files}
 */
module.exports = function (api) {
    /**
     * get the base configuration
     */
    const {
        presets,
        plugins,
        env,
        ignore
    } = base(api)
  
    return {
        presets,
        plugins,
        env,
        ignore
    };
  }