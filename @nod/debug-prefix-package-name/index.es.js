import { sync } from "read-pkg-up";
import debug from "debug";
import tap from "@f/tap";
import { dirname } from "path";

export const getPackageName = dir => {
  const { pkg: { name: packageName } } = sync(dir);
  return packageName;
};

export const debugCurrent = tap(debug("@nod/debug-prefix-package-name"));

export const defaultTemplate = (
  extraPrefix,
  packagePrefix = getPackageName()
) => debugCurrent(`${packagePrefix}/${extraPrefix}`);

export const prefixDebugWithPackageName = (
  extraPrefix,
  template = defaultTemplate,
  debugModule = debug,
  packageName = getPackageName()
) =>
  debugModule(extraPrefix ? template(extraPrefix, packageName) : packageName);

export default prefixDebugWithPackageName;
