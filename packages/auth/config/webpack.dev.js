const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const { ModuleFederationPlugin } = webpack.container;

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8082/",
    // publicPath: "auto", // It automatically detects the URL based on the location of the remoteEntry.js file.
  },
  devServer: {
    port: 8082,
    historyApiFallback: true, // by default redirects to /index.html
    // historyApiFallback: {
    //   index: "/index.html",
    // },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap.js",
      },
      shared: packageJson.dependencies,
      // shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
