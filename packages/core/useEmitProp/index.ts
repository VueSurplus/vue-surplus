import { useClone } from '../useClone'
import { UnwrapRef, computed, getCurrentInstance, ref, watch } from 'vue'

export interface EmitPropOptions {
    /**
     * passive设置是否采用change方式来构建受控组件
     * @default false
     */
    passive?: boolean
    /**
     * 默认值
     */
    defaultValue?: any
}


export function useEmitProp<T extends object, K extends keyof T>(props: T, key?: K, options?: EmitPropOptions): any
export function useEmitProp<T extends object, K extends keyof T>(props: T, options: EmitPropOptions): any
export function useEmitProp<T extends object, K extends keyof T>(props: T, key: K = '' as K, options: EmitPropOptions = {}): any {
    if (typeof key === 'object') {
        options = key
        key = 'modelValue' as K
    }
    const { passive = false, defaultValue } = options || {}
    if (props[key!] === null && (defaultValue === null || defaultValue === undefined)) return null
    key ||= 'modelValue' as K
    const event = `update:${key!.toString()}`
    const vm = getCurrentInstance()
    const emits = vm?.emit!
    if (passive) {
        return {
            change: (value: T[K]) => {
                emits(event, value)
            },
        }
    }

    if (typeof (props[key!] || defaultValue) === 'object') {
        const proxy = ref<T[K]>(useClone(props[key] || defaultValue,true))
        watch(
            () => props[key!],
            (v: T[K]) => {
                if (v !== proxy.value) {
                    proxy.value = v as UnwrapRef<T[K]>
                }
            }
        )
        watch(
            proxy,
            (v) => {
                if (v !== props[key!]) {
                    emits(event, v)
                }
            },
            { deep: true }
        )
        return proxy
    }
    return computed<T[K]>({
        get() {
            return props[key!] || defaultValue
        },
        set(value) {
            emits(event, value)
        },
    })
}
