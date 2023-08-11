import { getTypeof, TypeName } from "../utils/getTypeOf";

function initCloneByTag<T>(value: T): T {
  const initObjectMap = {
    boolean: Boolean,
    date: Date,
    number: Number,
    string: String,
    array: [],
    object: Object.create(null),
    set: Set,
    map: Map,
  };
  const tag: TypeName = getTypeof(value);
  const InitObject = initObjectMap[tag];
  if (value === null || typeof value !== "object") return value;
  switch (tag) {
    case "boolean":
    case "date":
      return new InitObject(+value) as T;
    case "number":
    case "string":
      return new InitObject(value) as T;
    case "array":
    case "object":
      return InitObject as T;
    case "set":
    case "map":
      return new InitObject() as T;
  }
  return value;
}

function forEach(source: object, tag: TypeName, callBack: (v, k?) => void) {
  switch (tag) {
    case "object":
      Object.keys(source).forEach((key) => callBack(source[key], key));
      break;
    case "set":
      (source as Set<any>).forEach((key) => callBack(key));
      break;
    case "map":
      (source as Map<any, any>).forEach((value, key) => callBack(value, key));
      break;
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
    const tag: TypeName = getTypeof(source);

    forEach(source, tag, (value, key) => {
      const valueTag = getTypeof(value);
      let cloneObject =
        cacheMap.get(<Object>source[key]) || initCloneByTag(value);
      tag === "set" && target.add(cloneObject);
      tag === "map" && target.set(key, cloneObject);
      tag === "object" && (target[key] = cloneObject);
      if (
        ((valueTag === "object" && source.hasOwnProperty(key)) ||
          valueTag === "array" ||
          valueTag === "set" ||
          valueTag === "map") &&
        !cacheMap.has(<Object>value)
      ) {
        stack.push({ source: <any>value, target: cloneObject });
        cacheMap.set(<Object>value, cloneObject);
      }
    });
  }
  return result;
}
