const path = require('path');


module.exports = function (nodeEnv) {
    return {
        mode: nodeEnv,
        target: 'web',
        /**
         * CAUTION! When only building, it hangs for NODE_ENV===development
         */
        watch: nodeEnv === 'development',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
        
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: [/node_modules/],
                    /*include: [
                        path.resolve(__dirname),
                        path.resolve(__dirname, "../types")
                    ],*/
                    use: [{
                        loader: 'babel-loader', 
                        options: {
                            configFile: path.resolve(__dirname, 'babel.config.js'),  
                        }
                                
                        /* use babel.config.js instead options: {
                            presets: [
                                
                                '@babel/preset-typescript',

                                '@babel/preset-env',

                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-syntax-class-properties',
                                '@babel/plugin-proposal-class-properties',
                                'babel-plugin-transform-async-to-promises',
                                [ '@babel/plugin-proposal-decorators', {"legacy": true } ],
                            ]
                        }*/
                    }],
                }, {
                    test: /\.(scss|css)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                }, /* interferes with primeicons!!!!{
                    test: /\.(woff(2)?|ttf|eot|svg|otf|png|jpg|webp)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                    {
                        loader: 'file-loader',
                    }
                    ]
                },{
                    test: /\.svg$/,
                    use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                        limit: 10000,
                        },
                    },
                    ],
                },*/
                //loaders for other file types can go here
            ]
        },
        performance: {
            maxAssetSize: 10000000,
            maxEntrypointSize: 10000000,
            hints: "warning"
        }
    
    };
}