import { UseUpdatePropOptions, useUpdateProp } from '../useEmitProp'

/**
 * @description: 批量设置更新props的属性
 * @param {T} props
 * @param {K} keys
 * @param {UseUpdatePropOptions} options
 * @return {*}
 */
export function useUpdateProps<T extends object, K extends keyof T>(props: T, keys?: K[], options?: UseUpdatePropOptions): any
export function useUpdateProps<T extends object, K extends keyof T>(props: T, options: UseUpdatePropOptions): any
export function useUpdateProps<T extends object, K extends keyof T>(
    props: T,
    keys: K[] | UseUpdatePropOptions = [],
    options: UseUpdatePropOptions = {}
): any {
    if (keys === undefined) {
        keys = Object.keys(props) as K[]
    }
    if (!Array.isArray(keys)) {
        options = keys
        keys = ['modelValue'] as K[]
    }
    const ret: any = {}
    keys.forEach((key) => {
        ret[key] = useUpdateProp(props, key, options)
    })
    return ret
}
