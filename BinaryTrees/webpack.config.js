const path = require("path");

module.exports = {
    entry: "./Visualizer.ts",
    resolve: {
        extensions: [".ts", "js"]
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
    devtool: "inline-source-map"
}