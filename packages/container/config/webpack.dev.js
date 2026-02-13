const { merge } = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const { ModuleFederationPlugin } = webpack.container;

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
      // shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
