import { useCreateSyncQueue } from '../useSyncQueue'

const useSyncQueue = useCreateSyncQueue()

export function useScriptQueue(pathName: string) {
    const [useAddScriptResolve, useDispatchScriptResolve] = useSyncQueue(Symbol(`${pathName}scriptResolve`))
    const [useAddScriptReject, useDispatchScriptReject] = useSyncQueue(Symbol(`${pathName}scriptReject`))
    const [useAddScriptLoad, useDispatchScriptLoad] = useSyncQueue(Symbol(`${pathName}scriptLoad`))
    return {
        useAddScriptResolve,
        useDispatchScriptResolve,
        useAddScriptReject,
        useDispatchScriptReject,
        useAddScriptLoad,
        useDispatchScriptLoad,
    }
}
