// webpack.config.js
module.exports = {
  // ... other configurations
  resolve: {
    alias: {
      "react-native$": "react-native-web",
    },
    extensions: [".web.js", ".js", ".jsx", ".json"],
  },
};
