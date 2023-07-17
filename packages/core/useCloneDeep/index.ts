import { isReactive, isRef, watch } from 'vue'
import { baseCloneDeep, originalCloneDeep } from './cloneDeep'
import { useAssignDeep } from '../useAssignDeep'
export interface cloneDeepOptions<T = any> {
    clone?: (source: T) => any
    reactive?: boolean,
    original?: boolean
}

export function useCloneDeep<T extends object>(source: T, options: cloneDeepOptions = {}) {
    const { clone, reactive, original } = options
    if (clone) return clone(source)
    const result = original ? originalCloneDeep(source, new WeakMap()) : baseCloneDeep(source)
    if (reactive && (isRef(source) || isReactive(source))) {
        watch(source, () => {
            const cloneData = original ? originalCloneDeep(source, new WeakMap()) : baseCloneDeep(source)
            useAssignDeep(result, cloneData)
        }, { deep: true }
        )
    }
    return result
}