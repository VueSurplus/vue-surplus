import { useCreateSyncQueue } from '../useSyncQueue'
const useSyncQueue = useCreateSyncQueue()
export function useLinkQueue(pathName: string) {
    const [useAddLinkResolve, useDispatchLinkResolve] = useSyncQueue(Symbol(`${pathName}linkResolve`))
    const [useAddLinkReject, useDispatchLinkReject] = useSyncQueue(Symbol(`${pathName}linkReject`))
    const [useAddLinkLoad, useDispatchLinkLoad] = useSyncQueue(Symbol(`${pathName}linkReject`))
    return { useAddLinkResolve, useDispatchLinkResolve, useAddLinkReject, useDispatchLinkReject, useAddLinkLoad, useDispatchLinkLoad }
}
