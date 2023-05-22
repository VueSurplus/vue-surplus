
# useClone

拷贝对象，`ref` 和 `reactive` 响应式对象返回一个普通对象。

## 使用

### 复制普通对象

```js
import { useClone } from './vue-surplus'
const state = {
    count: 0,
    text: 'demo'
}
const copyState=useClone(state)
```

### 将响应对象转换为普通对象

```js
// store.js
import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    // state
    const count = ref(0)

    // getters
    const doubleCount = computed(() => count.value * 2)

    // actions
    function increment() {
      count.value++
    }

    return { count, doubleCount, increment }
  }
)
```


### With Persistence

Store in `localStorage` with `useStorage()`:

```js
// store.js
import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => useStorage('vueuse-local-storage', 'initialValue'),
)
```

```js
// component.js
import { useGlobalState } from './store'

export default defineComponent({
  setup() {
    const state = useGlobalState()
    return { state }
  },
})
```
