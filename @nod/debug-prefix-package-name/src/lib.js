// @flow
import debug from "debug";
import { dirname, join } from "path";
import { sync } from "read-pkg-up";
import { name as packageName } from "../package.json";

export const debugInternal = (
  variable: ?any,
  description: ?string = " %O"
): any => [debug(packageName)(description, variable), variable][1];

export const defaultTemplate = (
  extraPrefix?: string = "",
  packagePrefix?: string = getPackageName()
): string => debugInternal(join(packagePrefix, extraPrefix), "defaultTemplate");

export const getPackageName = (dir?: string = process.cwd()): string => {
  const { pkg: { name } } = sync({ cwd: dir });
  return debugInternal(
    module && module.parent ? module.parent : name,
    "packageName"
  );
};
