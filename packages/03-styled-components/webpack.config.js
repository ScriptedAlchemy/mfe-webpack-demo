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
    publicPath: "http://localhost:3003/",
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
      name: "app_three",
      library: { type: "system" },
      filename: "remoteEntry.js",
      exposes: {
        Button: "./src/Button"
      },
      shared: ["react", "react-dom"]
    }),
    new CopyPlugin([
      { from: 'public', to: '.' }
    ])
  ]
};
