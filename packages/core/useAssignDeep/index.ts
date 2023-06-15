
import { getTypeof } from "../utils/getTypeOf";

export function useAssignDeep<T extends object>(target: T, ...sources: T[]): T {
    if (!sources.length) return target
    const stack: any[] = [{ data: target, mergeData: undefined }]
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
    return target
}
