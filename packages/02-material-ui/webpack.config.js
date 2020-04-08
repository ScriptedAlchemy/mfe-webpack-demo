const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false
  },

  output: {
    publicPath: "http://localhost:3002/",
    libraryTarget: "system"
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")]
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app_two",
      library: { type: "system" },
      filename: "remoteEntry.js",
      exposes: {
        Dialog: "./src/Dialog"
      },
      remotes: {
        app_one: "app_one",
      },
      shared: ["react", "react-dom","react-router-dom"]
    }),
    new CopyPlugin([
      { from: 'public', to: '.' }
    ])
  ]
};
