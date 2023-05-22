import { isReactive, unref, watch } from "vue";
import { getTypeof } from "../utils/getTypeOf";

export function cloned<T>(source: T, options?: { deep: boolean, manual: boolean }): T {
    const sourceType = getTypeof(source)
    let cloneData
    if (sourceType === "array") {
        cloneData = [];
        if (options?.deep) (<any[]>source).forEach((item) => cloneData.push(cloned(item, options)));
        else cloneData = [...<any[]>source];
    } else if (sourceType === "object") {
        cloneData = {};
        if (options?.deep)
            for (var key in source) {
                cloneData[key] = cloned(source[key], options);
            }
        else
            cloneData = { ...source }
    } else {
        cloneData = source;
    }
    return cloneData as T;
}

export function cloneReactive<T extends object>(source: T, options?: { deep: boolean, manual: boolean }) {
   let  value = unref(source)
    if (isReactive(source)) {
        value = cloned(source, options)
    }
    if (options?.manual) {
        watch(source, () => {
            debugger
            const cloneData = cloneReactive(source, { deep: options.deep, manual: false })
            Object.assign(value, cloneData)
        }, { ...options,deep:true }
        )
    }
    return value

}