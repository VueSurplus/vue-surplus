import { it, expect, describe,vi } from 'vitest'
import { useCreateSyncQueue } from '.'

describe('useCreateSyncQueue', () => {
    it('SyncQueue', () => {
        const fn=vi.fn(()=>{
            console.log('execute queue function')
        })
        const useSyncQueue = useCreateSyncQueue()
        const [useAddQueue, useDispatch] = useSyncQueue(Symbol('queue'))
   
        useAddQueue(fn)

        useDispatch()
        expect(fn).toHaveBeenCalled()

        useDispatch()
  
    })
})
