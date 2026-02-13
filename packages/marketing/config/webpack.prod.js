const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const { ModuleFederationPlugin } = webpack.container;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      exposes: {
        "./MarketingApp": "./src/bootstrap.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
