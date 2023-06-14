import { isReactive, unref, watch } from "vue";
import { getTypeof } from "../utils/getTypeOf";
import { useAssignDeep } from "../useAssignDeep";

function cloneDeep<T>(source: T): T {
    const result = {}
    const stack: any[] = [{ data: source, cloned: result }]
    while (stack.length) {
        let { cloned, data } = stack.pop()!;
        for (let key in data) {
            if (getTypeof(data[key]) === 'object' || getTypeof(data[key]) === 'array') {
                cloned[key] = Array.isArray(data[key]) ? [] : {}
                stack.push({ data: data[key], cloned: cloned[key] })
            } else {
                cloned[key] = data[key]
            }
        }
    }
    return result as T
}

export function cloned<T>(source: T, options?: { deep: boolean, manual: boolean }): T {
    if (options?.deep) {
        return cloneDeep<T>(source)
    }
    return { ...source } as T
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

export function cloneStructed<T extends object>(source:T,options?:{deep:boolean,manual:boolean}){
    if(options?.deep&&window.structuredClone){
        return window.structuredClone(source)
    }else{
        return cloned(source,options)
    }
}


