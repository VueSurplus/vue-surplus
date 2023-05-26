
import { getTypeof } from "../utils/getTypeOf";

export function useAssignDeep<T extends object>(object: T, ...sources: T[]): T {
    if (!sources.length) return object
    sources.forEach((source) => {
        Object.entries(source).forEach(([key, value]) => {
            if (getTypeof(object[key]) === 'object' && getTypeof(value) === 'object') {
                object[key] = useAssignDeep(object[key], value)
            }
            else if (getTypeof(object[key]) === 'array' && getTypeof(value) === 'array') {
                for (let i = 0; i < value.length; i++) {
                    if (typeof object[key][i] === 'object') {
                        object[key][i] = useAssignDeep(object[key][i], value[i])
                    } else {
                        object[key][i] = value[i]
                    }
                }
            }
            else {
                object[key] = value
            }
        })
    })
    return object
}

export function useMergeDeep<T extends object>(target: T, ...sources: T[]): T {
    if (!sources.length) return target
    const stack: any[] = [{ data: target, mergeData: null }]
    sources.forEach(source => {
        while (stack.length) {
            const { data, mergeData = source } = stack.pop()
            Object.keys(data).forEach(key => {
                const dataType = getTypeof(data[key])
                const mergeDataType = getTypeof(mergeData[key])
                if (dataType === 'object' && mergeDataType === 'object') {
                    stack.push({ data: data[key], mergeData: mergeData[key] })
                } else if (dataType === 'array' && mergeDataType === 'array') {
                    stack.push({ data: data[key], mergeData: mergeData[key] })
                } else {
                    data[key] = mergeData[key]
                }
            })

        }
    })
}
