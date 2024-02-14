
const base = require("@calliopadev/babel-config/api.babel.config.js")

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
        env: {
            ...env,
            test: {
                ...(env?.test ?? {}),
                plugins: [
                    ...(env?.test?.plugins ?? []),
                    "transform-require-context",
                ]
            }
        },
        ignore
    };
  }