const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  optimization: {
    minimize: false,
  },
  devServer: {
    open: true,
    compress: false,
    contentBase: './src',
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { pragma: "create" }],
            ],
          },
        },
      },
      // {
      //   test: /\.vue/,
      //   use: {
      //     loader: require.resolve('./myloader.js')
      //   }
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ]
};
