function createWrapper<T extends (...args: any[]) => any>(executor: (...args: any[]) => any, fn: T) {
    return function (): Promise<ReturnType<T>> {
        return new Promise<Awaited<ReturnType<T>>>((resolve, inject) => {
            Promise.resolve(executor(fn)).then(resolve, inject)
        })
    }
}

function deferredFn<T extends (...args: any[]) => any>(ms: number): (...args: any[]) => any {
    let timer: NodeJS.Timeout | null = null
    let isSetting = false
    let lastValue: Promise<ReturnType<T>> | ReturnType<T>
    function clear() {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    }
    return function (fn: T): Promise<ReturnType<T>> | ReturnType<T> {
        if (timer) {
            clear()
        } else {
            if (isSetting) {
                lastValue = fn()
                isSetting = !isSetting
            } else {
                lastValue = new Promise((resolve, inject) => {
                    timer = setTimeout(() => {
                        isSetting = !isSetting
                        clear()
                        resolve(fn())
                    }, ms)
                })
            }
        }
        return lastValue
    }
}

/**
 * @description: 延迟执行
 * @param {array} args
 * @return {*}
 */
export function useDeferredFn<T extends (...args: any[]) => any>(fn: T, ms = 200): (...args: any[]) => Promise<ReturnType<T>> {
    return createWrapper<T>(deferredFn<T>(ms), fn)
}

