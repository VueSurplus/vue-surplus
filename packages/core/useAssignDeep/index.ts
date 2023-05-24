
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
