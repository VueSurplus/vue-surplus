import { inject, readonly } from 'vue'

export function useInjectReadonly(field: string[]) {
    const injectObj: any = {}
    field.forEach((key) => {
        injectObj[key] = inject(key)
    })
    return readonly(injectObj)
}
