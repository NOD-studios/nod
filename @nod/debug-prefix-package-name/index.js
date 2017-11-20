const debug = require("debug");
const { defaultTemplate, getPackageName } = require("./lib");

const prefixDebugWithPackageName = (
  extraPrefix,
  template = defaultTemplate,
  debugModule = debug,
  packageName = getPackageName()
) =>
  debugModule(extraPrefix ? template(extraPrefix, packageName) : packageName);

module.exports = prefixDebugWithPackageName //eslint-disable-line
