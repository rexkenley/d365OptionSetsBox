module.exports = {
  setupFiles: ["<rootDir>/.jest/register-context.js"],
  transform: {
    "^.+\\.jsx?$": [
      "babel-jest",
      {
        presets: ["@babel/preset-env", "@babel/preset-react"]
      }
    ]
  },
  moduleNameMapper: {
    //https://github.com/OfficeDev/office-ui-fabric-react/blob/master/6.0_RELEASE_NOTES.md#lib-commonjs
    "office-ui-fabric-react/lib/(.*)$": "office-ui-fabric-react/lib-commonjs/$1"
  }
};
