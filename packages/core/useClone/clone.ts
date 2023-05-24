import { isReactive, unref, watch } from "vue";
import { getTypeof } from "../utils/getTypeOf";
import { useAssignDeep } from "../useAssignDeep";

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
    let value = unref(source)
    if (isReactive(source)) {
        value = cloned(source, options)
    }
    if (options?.manual) {
        watch(source, () => {
            const cloneData = cloneReactive(source, { deep: options.deep, manual: false })
            useAssignDeep(value, cloneData)
        }, { ...options, deep: true }
        )
    }
    return value

}

export function cloneDeep<T extends object>(source: T) {
    let id = 0
    const cacheArray: any[] = [{ instance: source }]
    const result = {}
    let cach = result
    const cacheSource = {}
    let pop = cacheArray.pop()

    while (pop) {
        pop.id && (cach = cacheSource[pop.id])
        Object.keys(pop.instance).forEach(key => {
            if (getTypeof(pop.instance[key]) === 'object') {
                cacheArray.push({ instance: pop.instance[key], id: id })
                cacheSource[id] = {}
                cach[key] = cacheSource[id]
                id++
            } else {
                cach[key] = pop.instance[key]
            }
        })
        pop = cacheArray.pop()
    }
    return result
}