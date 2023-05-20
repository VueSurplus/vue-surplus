import { UseLoadLinkOptions, UseLoadLinkReturn, useLoadLink } from '../useLoadLink'

export interface UseLoadLinksReturn {
    load: Promise<any[]>
    unload: () => void
}

/**
 * @description: 动态加载link标签hook
 * 参考 VueUse 的 useScriptTag 和 useStyleTag
 * @param {string[]} href
 * @param {function} onLoaded
 * @param {UseLoadLinkOptions} options
 * @return {*}
 */
export function useLoadLinks(href: string[], onLoaded?: () => void, options?: UseLoadLinkOptions): UseLoadLinksReturn
export function useLoadLinks(href: string[], options: UseLoadLinkOptions): UseLoadLinksReturn
export function useLoadLinks(
    href: string[],
    onLoaded: (() => void) | UseLoadLinkOptions = () => {},
    options: UseLoadLinkOptions = {}
): UseLoadLinksReturn {
    if (typeof onLoaded === 'object') {
        options = onLoaded
        onLoaded = () => {}
    }
    const loads: any[] = []
    const unloads: any[] = []
    href.forEach((item) => {
        const { load, unload } = useLoadLink(item, options)
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
