// @flow
import debug from "debug";
import { defaultTemplate, getPackageName } from "./lib";

export default (
  extraPrefix?: string = "",
  template?: Function = defaultTemplate,
  debugModule?: Function = debug,
  packageName?: string = getPackageName(module ? module.parent : "")
): Function =>
  debugModule(extraPrefix ? template(extraPrefix, packageName) : packageName);
