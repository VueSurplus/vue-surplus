import { useLazyScript, LazyScriptOptions } from '../useLazyScript'

export interface UseLazyScriptsReturn {
    load: Promise<HTMLScriptElement[]>
    unload: () => void
}


export function useLazyScripts(src: string[], onLoaded?: () => void, options?: LazyScriptOptions): UseLazyScriptsReturn
export function useLazyScripts(src: string[], options: LazyScriptOptions): UseLazyScriptsReturn
export function useLazyScripts(
    src: string[],
    onLoaded: (() => void) | LazyScriptOptions = () => {},
    options: LazyScriptOptions = {}
): UseLazyScriptsReturn {
    if (typeof onLoaded === 'object') {
        options = onLoaded
        onLoaded = () => {}
    }
    const loads: any[] = []
    const unloads: any[] = []
    src.forEach((item) => {
        const { load, unload } = useLazyScript(item, options)
        loads.push(load)
        unloads.push(unload)
    })
    const load = Promise.all(loads).then((el) => {
        if (typeof onLoaded === 'function') onLoaded()
        return el
    })
    const unload = () => {
        unloads.forEach((fn) => fn())
    }
    return {
        load,
        unload,
    }
}
