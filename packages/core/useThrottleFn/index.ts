function createWrapper<T extends (...args: any[]) => any>(executor: (...args: any[]) => any, fn: T) {
    return function () {
        return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
            Promise.resolve(executor(fn)).then(resolve, reject)
        })
    }
}
function throttleFn<T extends (...args: any[]) => any>(ms?: number) {
    let lastExe = 0
    let isLock = false
    let lastValue: any
    return function (fn: T) {
        const elapsed = Date.now() - lastExe
        if (typeof ms === 'number' && elapsed > ms) {
            lastExe = Date.now()
            lastValue = fn()
        }
        if (typeof ms === 'undefined' && !isLock) {
            lastValue = fn(() => {
                isLock = false
            })
            isLock = true
        }
        return lastValue
    }
}
export function useThrottleFn<T extends (...args: any[]) => any>(fn: T, ms?: number) {
    return createWrapper<T>(throttleFn<T>(ms), fn)
}
