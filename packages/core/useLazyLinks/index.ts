import { LazyLinkOptions, useLazyLink } from '../useLazyLink'

export interface UseLazyLinksReturn {
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
export function useLazyLinks(href: string[], onLoaded?: () => void, options?: LazyLinkOptions): UseLazyLinksReturn
export function useLazyLinks(href: string[], options: LazyLinkOptions): UseLazyLinksReturn
export function useLazyLinks(
    href: string[],
    onLoaded: (() => void) | LazyLinkOptions = () => {},
    options: LazyLinkOptions = {}
): UseLazyLinksReturn {
    if (typeof onLoaded === 'object') {
        options = onLoaded
        onLoaded = () => {}
    }
    const loads: any[] = []
    const unloads: any[] = []
    href.forEach((item) => {
        const { load, unload } = useLazyLink(item, options)
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
