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
    publicPath: "http://localhost:3001/",
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
      },
      {
        parser: {
          system: false
        }
      }
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app_one",
      library: { type: "system" },
      filename: "remoteEntry.js",
      remotes: {
        app_two: "app_two",
        app_three: "app_three"
      },
      exposes: {
        'AppContainer':'./src/App'
      },
      shared: ["react", "react-dom","react-router-dom"]
    }),
    new CopyPlugin([
      { from: 'public', to: '.' }
    ])
  ]
};
