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
export function useEmitProp(key?: string): any
export function useEmitProp(options: EmitPropOptions): any
export function useEmitProp(key: string, options?: EmitPropOptions): any
export function useEmitProp(key: string | EmitPropOptions = 'modelValue', options: EmitPropOptions = {}): any {
    if (typeof key === 'object') {
        options = key
        key = 'modelValue'
    }
    const { passive = false, defaultValue } = options || {}
    const vm = getCurrentInstance()
    const emits = vm?.emit!
    const props = vm?.props!
    key ||= 'modelValue'
    if (props[key!] === null && (defaultValue === null || defaultValue === undefined)) return null

    const event = `update:${key!.toString()}`

    if (passive) {
        return {
            change: (value) => {
                emits(event, value)
            },
        }
    }

    if (typeof (props[key!] || defaultValue) === 'object') {
        const proxy = ref(useClone(props[key] || defaultValue, true))
        watch(
            () => props[<string>key!],
            (v) => {
                if (v !== proxy.value) {
                    proxy.value = v
                }
            }
        )
        watch(
            proxy,
            (v) => {
                if (v !== props[<string>key!]) {
                    emits(event, v)
                }
            },
            { deep: true }
        )
        return proxy
    }
    return computed({
        get() {
            return props[<string>key!] == null ? defaultValue : props[<string>key!]
        },
        set(value) {
            emits(event, value)
        },
    })
}
