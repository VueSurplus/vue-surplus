import { getTypeof } from "../utils/getTypeOf";

export function baseCloneDeep<T extends Object>(source: T) {
    try {
        if (typeof structuredClone === 'function') {
            return structuredClone(source)
        } else {
            return JSON.parse(JSON.stringify(source))
        }
    } catch (error) {
        return originalCloneDeep(source, new WeakMap())
    }
}

export function originalCloneDeep<T extends Object>(source: T, cacheMap: WeakMap<Object, string | Symbol>) {
    const result = Array.isArray(source) ? [] : Object.create(null)
    const stack = [{ target: result, source }]
    while (stack.length) {
        const { source, target } = stack.pop()!
        for (let key in source) {
            if (source.hasOwnProperty(key) &&
                (getTypeof(source[key]) === 'object' || getTypeof(source[key]) === 'array') &&
                !cacheMap.has(<Object>source[key])) {
                target[key] = Array.isArray(source[key]) ? [] : Object.create(null)
                stack.push({ source: <any>source[key], target: target[key] })
                cacheMap.set(<Object>source[key], key)
            } else {
                target[key] = source[key]
            }
        }
    }
    return result
}
