import { cloned, cloneReactive } from "./clone";
import { isReactive, isRef } from "vue";

export interface cloneOptions<T = any> {
    deep?: boolean
    clone?: (source: T, deep?: { deep: boolean, manual: boolean }) => T
    manual?: boolean
}

export function useClone<T extends object>(source: T, deep: boolean)
export function useClone<T extends object>(source: T, options: cloneOptions | boolean = {}): T {
    let deep: boolean = false
    let clone: ((source: T, deep?: { deep: boolean, manual: boolean }) => T) | undefined = undefined
    let manual: boolean = false
    if (typeof options === 'boolean') { deep = options }
    else { ({ deep=false, clone, manual=false } = options) }
    if (isRef(source) || isReactive(source)) {
        clone ||= cloneReactive
    } else {
        clone ||= cloned
    }
    return clone(source, { deep, manual })
}