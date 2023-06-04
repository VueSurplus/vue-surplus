# useThrottleFn

函数节流。

## 使用

### 函数节流

```html
<script lang="ts" setup>
import { ref } from 'vue';
import { useThrottleFn } from 'vue-surplus'
const count = ref(0)
const clickCount = ref(0)
const changeCount = () => {
    count.value++
}
const throttle = useThrottleFn(changeCount, 200)
const handleClick = () => {
    throttle()
    clickCount.value++
}

</script>
<template>
    <button @click="handleClick"></button>
    count: {{ count }}
    clickCount:{{ clickCount }}
</template>
```

### 手动控制时间间隔

``` html
<script lang="ts" setup>
import { ref } from 'vue';
import { useThrottleFn } from 'vue-surplus'
const count = ref(0)
const clickCount = ref(0)
const changeCount = (next) => {
    count.value++
    if (count.value < 10) {
        next()
    }
}
const throttle = useThrottleFn(changeCount)
const handleClick = () => {
    throttle()
    clickCount.value++
}

</script>
<template>
    <button @click="handleClick"></button>
    count: {{ count }}
    clickCount:{{ clickCount }}
</template>
```

## 使用场景

频繁出发的函数可以考虑用函数节流，ajax请求可以手动触发时间间隔。
