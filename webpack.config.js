module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "build/bundle.js",
    path: __dirname
  },
  devtool: "source-map",
  watchOptions: {
    ignored: [/node_modules/]
  },
  resolve: {
    modules: ["./node_modules"]
  }
};
