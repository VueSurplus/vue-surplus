
# useClone

拷贝对象，`ref` 和 `reactive` 响应式对象返回一个普通对象。

<script setup>
  import DemoContainer from '../../.vitepress/theme/components/DemoContainer.vue'
</script>

<DemoContainer />

## 使用

```js
const copyState=useClone(state, options)
```

options: object

- deep: boolean是否深复制
- manual: boolean复制的普通对象和state值同步

### 复制普通对象

```js
import { useClone } from './vue-surplus'
const state = {
    count: 0,
    text: 'demo'
}
const copyState=useClone(state)
console.log(copyState) // { count: 0, text: 'demo' }


```

### 将响应对象转换为普通对象

```js
import { isReactive, isRef, reactive, ref } from 'vue';
import { useClone } from './index'
const state = {
    count: 0,
    text: 'demo'
}
const stateRef = ref(state)
const stateReactive = reactive(state)
const stateRefCloned = useClone(stateRef)
const stateReactiveCloned = useClone(stateReactive)
console.log(stateRefCloned) // { count: 0, text: 'demo' }
console.log(stateReactiveCloned) // { count: 0, text: 'demo' }
```

### 响应复制

```js
import { reactive, watch } from 'vue';
import { useClone } from './index'
const state = {
    count: 0,
    text: 'demo'
}
const stateReactive = reactive(state)
const stateWatchCloned = useClone(stateReactive, { manual: true })
console.log(JSON.stringify(stateWatchCloned)) // { count: 0, text: 'demo' }
watch(stateReactive, () => {
    console.log(JSON.stringify(stateWatchCloned)) // { count: 2, text: 'demo' }
})
stateReactive.count = 2
```
