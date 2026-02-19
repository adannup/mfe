const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const { ModuleFederationPlugin } = webpack.container;

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8083/",
    // publicPath: "auto", // It automatically detects the URL based on the location of the remoteEntry.js file.
  },
  devServer: {
    port: 8083,
    historyApiFallback: true, // by default redirects to /index.html
    // historyApiFallback: {
    //   index: "/index.html",
    // },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap.js",
      },
      shared: packageJson.dependencies,
      // shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
