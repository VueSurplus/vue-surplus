import { cloned, cloneReactive } from "./clone";
import { isReactive, isRef } from "vue";

export interface cloneOptions<T = any> {
    deep?: boolean
    clone?: (source: T, deep?: { deep: boolean, manual: boolean }) => T
    manual?: boolean
}

export function useClone<T>(source: T, options: cloneOptions={}): T {
    let { deep = false, clone, manual = false } = options!
    if (isRef(source) || isReactive(source)) {
        clone ||= cloneReactive
    } else {
        clone ||= cloned
    }
    return clone(source, { deep, manual })
}