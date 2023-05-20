/**
 * @description: 优化点
 * 1.passive语义不明确
 * @return {*}
 */
import { cloneDeep } from 'lodash-es'
import { UnwrapRef, computed, getCurrentInstance, ref, watch } from 'vue'

export interface UseUpdatePropOptions {
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

/**
 * @description: 更新props钩子，v-model也是其中的一种
 * refer to VueUse useVModel
 * @param {T} porps
 * @param {keyof T} key
 * @param {object} options
 */
export function useUpdateProp<T extends object, K extends keyof T>(props: T, key?: K, options?: UseUpdatePropOptions): any
export function useUpdateProp<T extends object, K extends keyof T>(props: T, options: UseUpdatePropOptions): any
export function useUpdateProp<T extends object, K extends keyof T>(props: T, key: K = '' as K, options: UseUpdatePropOptions = {}): any {
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
        const proxy = ref<T[K]>(cloneDeep(props[key] || defaultValue))
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
