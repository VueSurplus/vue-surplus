import { useLoadScript, UseLoadScriptOptions } from '../useLoadScript'

export interface UseLoadScriptsReturn {
    load: Promise<HTMLScriptElement[]>
    unload: () => void
}


/**
 * @description: 动态批量加载script标签hook
 * 参考 VueUse 的 useScriptTag 和 useStyleTag
 * @param {string[]} src
 * @param {function} onLoaded
 * @param {UseLoadLinkOptions} options
 * @return {*}
 */
export function useLoadScripts(src: string[], onLoaded?: () => void, options?: UseLoadScriptOptions): UseLoadScriptsReturn
export function useLoadScripts(src: string[], options: UseLoadScriptOptions): UseLoadScriptsReturn
export function useLoadScripts(
    src: string[],
    onLoaded: (() => void) | UseLoadScriptOptions = () => {},
    options: UseLoadScriptOptions = {}
): UseLoadScriptsReturn {
    if (typeof onLoaded === 'object') {
        options = onLoaded
        onLoaded = () => {}
    }
    const loads: any[] = []
    const unloads: any[] = []
    src.forEach((item) => {
        const { load, unload } = useLoadScript(item, options)
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
