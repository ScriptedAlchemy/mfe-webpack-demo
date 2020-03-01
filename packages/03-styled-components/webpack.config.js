const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index",
  cache: false,

  mode: "development",
  devtool: "source-map",

  optimization: {
    minimize: false
  },

  output: {
    publicPath: "http://localhost:3003/"
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
      name: "app_sc",
      library: { type: "var", name: "app_sc" },
      filename: "remoteEntry.js",
      remotes: {
        host_app: "host_app"
      },
      exposes: {
        Button: "./src/Button"
      },
      shared: ["react", "react-dom","react-router","react-router-dom"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
