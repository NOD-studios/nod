// @flow
import debug from "debug";
import { defaultTemplate, getPackageName } from "./lib";

export const debugWithPackageName = (
  extraPrefix?: string = "",
  packageName?: string = getPackageName(
    module && module.parent ? module.parent : ""
  ),
  template?: Function = defaultTemplate,
  debugModule?: Function = debug
) =>
  debugModule(extraPrefix ? template(extraPrefix, packageName) : packageName);

export default debugWithPackageName;
export * from "./lib";
