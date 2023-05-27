
# useSyncQueue

执行同步队列函数。

## 使用

```js
import { useCreateSyncQueue } from 'vue-surplus'
const useSyncQueue = useCreateSyncQueue()
const [useAddQueue, useDispatch] = useSyncQueue(Symbol('queue'))
useAddQueue(()=>{
    console.log('execute queue function')
})

useDispatch()//execute queue function
```
