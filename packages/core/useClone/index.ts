import { cloned, cloneReactive, cloneStructed } from "./clone";
import { isReactive, isRef } from "vue";

export interface cloneOptions<T = any> {
    deep?: boolean
    clone?: (source: T, deep?: { deep: boolean, manual: boolean }) => T
    manual?: boolean
    structed?: boolean
}
export function useClone<T extends object>(source: T, options?: cloneOptions | boolean):any{
    let deep: boolean = false
    let clone: ((source: T, deep?: { deep: boolean, manual: boolean }) => T) | undefined = undefined
    let manual: boolean = false
    let structed: boolean = false
    options||={}
    if (typeof options === 'boolean') { deep = options }
    else { ({ deep=false, clone, manual=false, structed=false } = options) }
    if (isRef(source) || isReactive(source)) {
        clone ||= cloneReactive
    } else if (structed) {
        clone ||= cloneStructed
    } {
        clone ||= cloned
    }
    return clone(source, { deep, manual })
}