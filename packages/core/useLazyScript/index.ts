import { useScriptQueue } from '../queue/scriptQueue'

export interface LazyScriptOptions {
    type?: string
    async?: boolean
    crossorigin?: string
    defer?: boolean
    attrs?: Record<string, string>
}

export interface UseLazyScriptReturn {
    load: Promise<HTMLScriptElement>
    unload: () => void
}

export function useLazyScript(src: string, onLoaded?: () => void, options?: LazyScriptOptions): UseLazyScriptReturn
export function useLazyScript(src: string, options: LazyScriptOptions): UseLazyScriptReturn
export function useLazyScript(
    src: string,
    onLoaded: (() => void) | LazyScriptOptions = () => {},
    options: LazyScriptOptions = {}
): UseLazyScriptReturn {
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
