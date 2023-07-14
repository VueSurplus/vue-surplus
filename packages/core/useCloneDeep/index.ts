/** 计划
 * 1.默认用structuredClone
 * 2.不支持structuredClone下用JSON
 * 3.报错情况下用递归，注意实现的一些细节
 * 4.设置一个配置用非递归方式，注意性能优化
 */
import { UnwrapRef } from 'vue'
import { cloneDeep } from './cloneDeep'
export interface cloneDeepOptions<T = any> {
    clone?: (source: T) => T
    manual?: boolean

}

export function useCloneDeep<T extends object>(source: T, options?: cloneDeepOptions): UnwrapRef<T> | T {
    try {
        if (typeof structuredClone === 'function') {
            return structuredClone(source)
        } else {
            return JSON.parse(JSON.stringify(source))
        }
    } catch (error) {
        return cloneDeep(source,new WeakMap())
    }
}