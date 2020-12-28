module.exports = {
    entry: [
        "./index.js"
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico|jpeg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'assets/images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },

    resolve: {
        extensions: ["*", ".js", "jsx"]
    },

    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },
       devServer: {
        contentBase: "./dist",
        port: 3000,
        historyApiFallback: true
    }
}
