
# useClone

复制对象，`ref` 和 `reactive` 响应式对象复制成一个普通对象。

## 使用

```js
const copyState=useClone(state, boolen|options)
```

options: `object`

- deep: `boolean` 是否深拷贝,默认是浅拷贝。
- manual: `boolean` 复制的普通对象和 `state` 值同步。
- clone: 自定义规则。

### 复制普通对象

浅拷贝：

```js
import { useClone } from './vue-surplus'
const state = {
    count: 0,
    text: 'demo'
}
const copyState=useClone(state)
console.log(copyState) // { count: 0, text: 'demo' }

```

深拷贝：

```js
import { useClone } from './vue-surplus'
const state = {
    count: 0,
    text: 'demo'
}
const copyState = useClone(state, true) 
//or const copyState=useClone(state, {deep:true})

console.log(copyState) // { count: 0, text: 'demo' }

```

### 将响应对象复制为普通对象

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

### 复制对象同步响应对象的值变动

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

### 自定义规则

```js
import { useClone } from './vue-surplus'
const state = {
    count: 0,
    text: 'demo'
}
const copyState = useClone((source) => ({ count: source.count + 1, text: source.text }))

console.log(copyState) // { count: 1, text: 'demo' }

```

## 使用场景

### 复制对象

实现对象的深复制和浅复制。

```js
import { useClone } from './vue-surplus'
const state = {
    count: 0,
    text: 'demo'
}
const copyState=useClone(state)
console.log(copyState) // { count: 0, text: 'demo' }
```

### Proxy 处理数组

Vue3 通过 `Proxy` 来实现响应式，但是 `Proxy` 在对大数据量的数组进行 `unshift` 操作时会有性能问题。

```html
<script lang="ts" setup>
import { ref } from 'vue';

const len = 1000000;
const arr = new Array(len);
for (let i = 0; i < len; i++) {
    arr[i] = { id: i, name: "test" };
}
const arrRef = ref(arr)
const onClick = () => {
    const list: any[] = []
    for (let i = 0; i < 50; i++) list.push({ a: 1 });
    arrRef.value.unshift(...list)
}
</script>
<template>
    <div>{{ arr.length }}</div>
    <button @click="onClick">click</button>
</template>
```

可以采用将 `Proxy` 数组转为普通数组然后进行操作在转为 `Proxy` ，因为创建 `Proxy` 的性能要比 `Proxy` 数组 `unshift` 性能少很多。

> 这种方式只适用于数组单纯作为展示。

```html
<script lang="ts" setup>
import { ref } from 'vue';
import { useClone } from './vue-surplus'

const len = 1000000;
const arr = new Array(len);
for (let i = 0; i < len; i++) {
    arr[i] = { id: i, name: "test" };
}
const arrRef = ref(arr)
const onClick = () => {
    const list: any[] = []
    const arrClone = useClone(arrRef)
    for (let i = 0; i < 50; i++) list.push({ a: 1 });
    arrClone.unshift(...list)
    arrRef.value = arrClone
}
</script>
<template>
    <div>{{ arr.length }}</div>
    <button @click="onClick">click</button>
</template>
```

### 表单初始化

查看详情时经常要给表单项赋值初始值，一般是通过 `props` 传给表单组件。vue 不推荐子组件直接修改 `props` 传递来对象值，所有需要在子组件中新建一个状态。

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

表单提交时往往要对值进行格式化处理，直接在相应对象上处理会触发依赖副作用，可以使用 `useClone` 来复制一个普通对象进行操作。

```html
<script lang="ts" setup>
import { reactive } from 'vue';
import { useClone } from 'vue-surplus';

const loginInfo = reactive({
    userName: '',
    passWord: ''
})
const data = useClone(loginInfo, { deep: true, menubar: true })
const handleLogin = () => {
    // 密码加密
    data.passWord=md5(data.passWord)
    // 发送请求...
}
</script>
<template>
    <input v-model="loginInfo.userName" type="tex" />
    <input v-model="loginInfo.passWord" type="password" />
    <button @click="handleLogin">登录</button>
</template>
```