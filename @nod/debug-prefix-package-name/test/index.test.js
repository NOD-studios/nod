/* eslint fp/no-unused-expression:0 */

import { debugInternal, getPackageName, defaultTemplate } from "../build/lib";
import debugWithPackageName from "../build/index";
import test from "ava";
import { name as packageName } from "./package.json";

const extraPrefix = "test";
const templateString = defaultTemplate(extraPrefix, packageName);

test("getPackageName", t => t.is(packageName, getPackageName(__dirname)));

test("should prefix properly", t =>
  debugWithPackageName(extraPrefix, packageName, defaultTemplate, debugName => {
    debugInternal({ debugName, templateString });
    return t.is(debugName, templateString);
  }));
