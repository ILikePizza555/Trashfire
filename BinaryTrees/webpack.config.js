const path = require("path");

module.exports = {
    entry: "./Visualizer.ts",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: "/node_modules/"
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    externals: {
        d3: "d3"
    },
    devServer: {
        publicPath: "/dist/",
        compress: true,
    },
    devtool: "inline-source-map"
}