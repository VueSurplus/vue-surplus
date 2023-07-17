/** 计划
 * 1.默认用structuredClone
 * 2.不支持structuredClone下用JSON
 * 3.报错情况下用递归，注意实现的一些细节
 * 4.设置一个配置用非递归方式，注意性能优化
 */
import { UnwrapRef, isReactive, isRef, watch } from 'vue'
import { baseCloneDeep } from './cloneDeep'
import { useAssignDeep } from '../useAssignDeep'
export interface cloneDeepOptions<T = any> {
    clone?: (source: T) => any
    reactive?: boolean

}

export function useCloneDeep<T extends object>(source: T, options: cloneDeepOptions = {}) {
    const { clone, reactive } = options
    if (clone) return clone(source)
    const result = baseCloneDeep(source)
    if (reactive && (isRef(source) || isReactive(source))) {
        watch(source, () => {
            const cloneData = baseCloneDeep(source)
            useAssignDeep(result, cloneData)
        }, { deep: true }
        )
    }
    return result
}