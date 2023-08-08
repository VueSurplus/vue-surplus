// 处理值类型：
// set和map 处理
import { getTypeof,TypeName } from "../utils/getTypeOf";

function initCloneByTag<T>(value: T): T {
  const initObjectMap = {
    boolean: Boolean,
    date: Date,
    number: Number,
    string: String,
    set:Set,
  };
  const tag:TypeName= getTypeof(value);
  if (tag === "boolean" || tag === "date") {
    return <T>new initObjectMap[tag](Number(value));
  } else if (tag === "number" || tag === "string") {
    return <T>new initObjectMap[tag](value);
  }else {
    return value;
  }
}

export function baseCloneDeep<T extends Object>(source: T) {
  try {
    if (typeof structuredClone === "function") {
      return structuredClone(source);
    } else {
      return JSON.parse(JSON.stringify(source));
    }
  } catch (error) {
    return originalCloneDeep(source, new WeakMap());
  }
}

export function originalCloneDeep<T extends Object>(
  source: T,
  cacheMap: WeakMap<Object, Object>
) {
  if (source === null || source === undefined) return source;
  const result = Array.isArray(source) ? [] : Object.create(null);
  const stack = [{ target: result, source }];
  while (stack.length) {
    const { source, target } = stack.pop()!;
    for (let key in source) {
      if (
        source.hasOwnProperty(key) &&
        (getTypeof(source[key]) === "object" ||
          getTypeof(source[key]) === "array") &&
        !cacheMap.has(<Object>source[key])
      ) {
        target[key] = Array.isArray(source[key]) ? [] : Object.create(null);
        stack.push({ source: <any>source[key], target: target[key] });
        cacheMap.set(<Object>source[key], target[key]);
      } else {
        target[key] = cacheMap.get(<Object>source[key]) || initCloneByTag(source[key]);
      }
    }
  }
  return result;
}
