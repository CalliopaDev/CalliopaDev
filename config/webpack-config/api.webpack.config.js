const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = function (nodeEnv) {
    return {
        mode: nodeEnv,
        target: 'node',
        /**
         * CAUTION! When only building, it hangs for nodeEnv===development
         */
        watch: nodeEnv === 'development',
        resolve: {
            extensions: ['.js', '.ts'],
            /**
             * enable the `tsconfig.json`-aliases as described [here](https://medium.com/@rossbulat/typescript-working-with-paths-packages-and-yarn-workspaces-6fbc7087b325)
             * [See this](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin)
             */
            plugins: [
                //new TsconfigPathsPlugin({ configFile: "./tsconfig.json"  }),
                //new PublishabeTechResolverPlugin()
            ],
        },
        optimization: {
            // We no not want to minimize our code.
            minimize: nodeEnv !== 'development'
        },
        devtool: 'source-map',
        node: {
            __dirname: false,
            __filename: false
        },
        /**
         * When we deploy the whole package, we must include the relevant node_modules,
         * during, dev, we have the whole libraries available
         */
        externals: nodeEnv === 'development' ? nodeExternals() : {
            //bufferutil: "bufferutil",
            //"utf-8-validate": "utf-8-validate",
            // see: https://github.com/charoitel/lambda-layer-canvas-nodejs
            // see: https://github.com/Automattic/node-canvas/issues/867
            //canvas: {}
        },
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: 'babel-loader', 
                        options: {
                            configFile: path.resolve(__dirname, 'babel.config.js'),  
                            presets: [
                                '@babel/preset-typescript',
                                ['@babel/preset-env', {"modules": false, "targets": { "node": "14.17" }}]
                            ],
                            plugins: [
                                ["@babel/plugin-transform-typescript", {
                                    allowDeclareFields: true,
                                }],
                                
                                // required by the ckeditor plugin
                                '@babel/plugin-proposal-object-rest-spread',

                                // to filter objects for the class properties
                                '@babel/plugin-syntax-class-properties',
                                '@babel/plugin-transform-class-properties',
                                '@babel/plugin-proposal-class-properties',

                                // other
                                '@babel/plugin-syntax-dynamic-import',
                            
                                'babel-plugin-transform-async-to-promises',
                                
                            ]
                        }
                            
                    }],
                }, /*{
                    test: /\.(scss|css)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                }, */
                //loaders for other file types can go here
            ]
        },
    
    };
}