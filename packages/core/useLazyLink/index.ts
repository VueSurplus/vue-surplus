import { useLinkQueue } from '../queue/linkQueue'
export interface LazyLinkOptions {
    type?: string
    rel?:
        | 'alternate'
        | 'author'
        | 'help'
        | 'icon'
        | 'licence'
        | 'next'
        | 'pingback'
        | 'prefetch'
        | 'prev'
        | 'search'
        | 'sidebar'
        | 'stylesheet'
        | 'tag'
    attrs?: Record<string, string>
}

export interface UseLazyLinkReturn {
    load: Promise<HTMLLinkElement>
    unload: () => void
}

/**
 * @description: 动态加载link标签hook
 * 参考 VueUse 的 useScriptTag 和 useStyleTag
 * @param {string} href
 * @param {function} onLoaded
 * @param {UseLoadLinkOptions} options
 * @return {*}
 */
export function useLazyLink(href: string, onLoaded?: () => void, options?: LazyLinkOptions): UseLazyLinkReturn
export function useLazyLink(href: string, options: LazyLinkOptions): UseLazyLinkReturn
export function useLazyLink(
    href: string,
    onLoaded: (() => void) | LazyLinkOptions = () => {},
    options: LazyLinkOptions = {}
): UseLazyLinkReturn {
    if (typeof onLoaded === 'object') {
        options = onLoaded
        onLoaded = () => {}
    }
    const { type, rel = 'stylesheet', attrs = {} } = options
    let el = document.querySelector<HTMLLinkElement>(`link[href="${href}"]`)
    const { useAddLinkResolve, useAddLinkReject, useAddLinkLoad, useDispatchLinkLoad, useDispatchLinkReject, useDispatchLinkResolve } =
        useLinkQueue(href)
    if (!el) {
        el = document.createElement('link')
        el.href = href
        el.rel = rel
        type && (el.type = type)
        Object.keys(attrs!).forEach((attr) => el?.setAttribute(attr, attrs![attr]))
        // Event listeners
        el.addEventListener('error', (event) => useDispatchLinkReject(event))
        el.addEventListener('abort', (event) => useDispatchLinkReject(event))
        el.addEventListener('load', () => {
            el!.setAttribute('data-loaded', 'true')
            useDispatchLinkLoad(el)
            useDispatchLinkResolve(el)
        })
        el = document.head.appendChild(el)
    } else if (el.hasAttribute('data-loaded')) {
        useDispatchLinkLoad(el)
        useDispatchLinkResolve(el)
    }
    const load = new Promise<HTMLLinkElement>((resolve, reject) => {
        useAddLinkResolve(resolve)
        useAddLinkReject(reject)
        if (typeof onLoaded === 'function') useAddLinkLoad(onLoaded)
    })
    const unload = () => {
        const el = document.querySelector<HTMLLinkElement>(`link[href="${href}"]`)
        if (el) document.head.removeChild(el)
    }

    return {
        load,
        unload,
    }
}
