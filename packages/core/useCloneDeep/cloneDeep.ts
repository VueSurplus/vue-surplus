/**
 * 4.处理各种类型复制
 * 5.处理sysmbol 为key
 */
import { getTypeof } from "../utils/getTypeOf";
export function cloneDeep<T extends Object>(source: T, cacheMap: WeakMap<Object, string | Symbol>): T {
    const result: T = Object.create(null)
    for (let key in source) {
        if (source.hasOwnProperty(key) &&
            (getTypeof(source[key]) === 'object' || getTypeof(source[key]) === 'array') &&
            !cacheMap.has(<Object>source[key])) {
            cacheMap.set(<Object>source[key], key)
            result[key] = <any>cloneDeep(<Object>source[key], cacheMap);

        } else {
            result[key] = source[key]
        }
    }
    return result
}
