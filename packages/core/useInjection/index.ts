import { inject, isReadonly, readonly } from "vue";
import { getTypeof } from "../utils/getTypeOf";

export function useInjecttion(key: string) {
    const injectState = inject(key)
    if ((getTypeof(injectState) === 'object' || getTypeof(injectState) === 'array') && !isReadonly(injectState)) {
        return readonly(<object>injectState)
    }
    return injectState
}