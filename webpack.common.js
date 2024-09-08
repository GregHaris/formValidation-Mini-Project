const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      title: "production",
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@fullcalendar": path.resolve(__dirname, "node_modules/@fullcalendar"),
    },
  },
};
