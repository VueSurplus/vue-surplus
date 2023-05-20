type queueNameType = string | Symbol | number | Object
/**
 * @description: 队列
 * 优化：添加remove、stop、end、size、inculdes
 * @param {Map} map
 * @param {*} any
 * @return {*}
 */
export function useCreateSyncQueue(map?: Map<queueNameType, any[]>) {
    const queueMap = map || new Map()
    function useSyncQueue(queueName: queueNameType): [typeof useAddQueue, typeof useDispatch] {
        const queue = queueMap.get(queueName) || []
        function useAddQueue<T extends (...args: any[]) => any>(queueFn: T[] | T) {
            if (!Array.isArray(queueFn)) queueFn = [queueFn]
            queue.push(...queueFn)
            queueMap.set(queueName, queue)
        }
        function useDispatch(value?: any) {
            if (!queue) return
            let fn = queue.shift()
            while (fn) {
                value = fn(value) || value
                fn = queue.shift()
            }
            queueMap.delete(queueName)
        }
        return [useAddQueue, useDispatch]
    }
    return useSyncQueue
}
