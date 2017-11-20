const debug = require("debug");
const { dirname } = "path";
const { sync } = require("read-pkg-up");
const packageName = require("./package.json").name;

const debugInternal = (variable, description = " %O") => {
  debug(packageName)(description, variable); //eslint-disable-line
  return variable;
};

const defaultTemplate = (extraPrefix, packagePrefix = getPackageName()) =>
  debugInternal(`${packagePrefix}/${extraPrefix}`, "defaultTemplate");

const getPackageName = dir => {
  const { pkg: { name: packageName } } = sync({ cwd: dir || process.cwd() });
  return debugInternal(packageName, "packageName");
};

module.exports = { debugInternal, defaultTemplate, getPackageName }; //eslint-disable-line
