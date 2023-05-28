import { EmitPropOptions, useEmitProp } from '../useEmitProp'

/**
 * @description: 批量设置更新props的属性
 * @param {T} props
 * @param {K} keys
 * @param {EmitPropOptions} options
 * @return {*}
 */
export function useEmitProps(keys: string[], options?: EmitPropOptions): any {
    if (!Array.isArray(keys)) return
    const ret: any = {}
    keys.forEach((key) => {
        ret[key] = useEmitProp(key, options)
    })
    return ret
}
