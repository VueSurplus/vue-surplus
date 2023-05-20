/**
 * @description: 优化点
 * 1.queue可以批量
 * 2.可以考虑去掉load:Promise，onloaded已经是配置回调了，但如果去掉了load，怎么捕获加载错误的信息
 * @return {*}
 */
import { useScriptQueue } from '../queue/scriptQueue'

export interface UseLoadScriptOptions {
    type?: string
    async?: boolean
    crossorigin?: string
    defer?: boolean
    attrs?: Record<string, string>
}

export interface UseLoadScriptReturn {
    load: Promise<HTMLScriptElement>
    unload: () => void
}

/**
 * @description: 动态加载script标签hook
 * 参考 VueUse 的 useScriptTag 和 useStyleTag
 * @param {string} src
 * @param {function} onLoaded
 * @param {UseLoadLinkOptions} options
 * @return {*}
 */
export function useLoadScript(src: string, onLoaded?: () => void, options?: UseLoadScriptOptions): UseLoadScriptReturn
export function useLoadScript(src: string, options: UseLoadScriptOptions): UseLoadScriptReturn
export function useLoadScript(
    src: string,
    onLoaded: (() => void) | UseLoadScriptOptions = () => {},
    options: UseLoadScriptOptions = {}
): UseLoadScriptReturn {
    if (typeof onLoaded === 'object') {
        options = onLoaded
        onLoaded = () => {}
    }
    const { type = 'text/javascript', async, crossorigin, defer, attrs = {} } = options
    let el = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    const { useDispatchScriptReject, useAddScriptResolve, useDispatchScriptResolve, useDispatchScriptLoad, useAddScriptReject, useAddScriptLoad } =
        useScriptQueue(src)
    if (!el) {
        el = document.createElement('script')
        el.src = src
        async && (el.async = async)
        crossorigin && (el.crossOrigin = crossorigin)
        defer && (el.defer = defer)
        el.type = type
        Object.keys(attrs!).forEach((attr) => el?.setAttribute(attr, attrs![attr]))

        el.addEventListener('error', (event) => useDispatchScriptReject(event))
        el.addEventListener('abort', (event) => useDispatchScriptReject(event))
        el.addEventListener('load', () => {
            el!.setAttribute('data-loaded', 'true')
            useDispatchScriptLoad(el)
            useDispatchScriptResolve(el)
        })
        el = document.head.appendChild(el)
    } else if (el.hasAttribute('data-loaded')) {
        useDispatchScriptLoad(el)
        useDispatchScriptResolve(el)
    }
    const load = new Promise<HTMLScriptElement>((resolve, reject) => {
        useAddScriptResolve(resolve)
        useAddScriptReject(reject)
        if (typeof onLoaded === 'function') useAddScriptLoad(onLoaded)
    })

    const unload = () => {
        const el = document.querySelector<HTMLLinkElement>(`link[href="${src}"]`)
        if (el) document.head.removeChild(el)
    }

    return {
        load,
        unload,
    }
}
