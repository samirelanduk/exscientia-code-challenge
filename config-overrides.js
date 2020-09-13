module.exports = function override(config) {
  config.optimization.splitChunks.cacheGroups = {
    kekule: {
      name: "kekule",
      priority: 10,
      reuseExistingChunk: false,
      test: /kekule/,
    },
  };
  config.optimization.minimizer[0].options.chunkFilter = chunk => chunk.name !== "kekule";
  return config;
}