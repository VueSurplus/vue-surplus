
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

options: `object`

- deep: `boolean` 是否深复制
- manual: `boolean` 复制的普通对象和state值同步

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

## 场景

### 拷贝对象

实现对象的深拷贝和浅拷贝。

```js
import { useClone } from './vue-surplus'
const state = {
    count: 0,
    text: 'demo'
}
const copyState=useClone(state)
console.log(copyState) // { count: 0, text: 'demo' }
```

### Proxy处理数组

Vue3通过proxy来实现响应式，但是proxy在对大数据量的数组进行unshift操作时会有性能问题。

```html
<div id="app">
  <div>{{ arr.length }}</div>
  <button @click="onClick">click</button>
</div>

<script>
  const { createApp } = Vue;

  const len = 1000000;
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = { id: i, name: "test" };
  }

  createApp({
    data() {
      return {
        arr,
      };
    },
    methods: {
      onClick() {
        const list=[]
        for (let i = 0; i < 50; i++) list.push({ a: 1 });
        this.arr.unshift(...list)
      },
    },
  }).mount("#app");
</script>
```

可以采用将Proxy数组转为普通数组然后进行操作在转为Proxy，因为创建Proxy的性能要比unshift Proxy数组带来的副作用性能少很多。

```html
<div id="app">
  <div>{{ arr.length }}</div>
  <button @click="onClick">click</button>
</div>

<script>
  import { useClone } from './vue-surplus'
  const { createApp,Ref } = Vue;

  const len = 1000000;
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = { id: i, name: "test" };
  }

  createApp({
    data() {
      return {
        arr,
      };
    },
    methods: {
      onClick() {
        const arrClone=useClone(this.arr)
        const list=[]
        for (let i = 0; i < 50; i++) list.push({ a: 1 });
        arrClone.unshift(...list)
        this.arr=Ref(arrClone)
      },
    },
  }).mount("#app");
</script>
```

### 表单初始化

查看详情时经常要给表单项赋值初始值，一般是通过props传给表单组件。vue不推荐子组件直接修改props传递来对象值，所有需要在子组件中新建一个状态。

```js
import { reactive } from 'vue';
import { useClone } from './index'
const props = defineProps<{
    formData: {
        name: string,
        age: string,
        address: string
    }
}>()
const formData = reactive(useClone(props.formData))
```

### 表单提交

表单提交时往往要对值进行格式化处理，直接在相应对象上处理会触发依赖副作用，可以使用useClone来复制一个普通对象进行操作。