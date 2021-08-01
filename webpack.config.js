const path = require("path")

module.exports = {
  mode: "production",
  entry: {
    background: ["./src/js/background.js"],
    content: ["./src/js/content.js"],
    index: ["./src/js/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist/assets/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  watch: true,
}
