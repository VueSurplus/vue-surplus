# useDeferredFn

延迟（默认：200ms）执行指定函数，时间间隔内函数又执行，取消函数执行，时间间隔之后函数执行。常用于loading。

## 使用

``` html
<script lang="ts" setup>
import { ref } from 'vue';
import { useDeferredFn } from 'vue-surplus'
const loading = ref(false)
const changLoading = () => {
    loading.value = !loading.value
}

const handleDeferred = () => {
    useDeferredFn(changLoading)
}

</script>
<template>
    <button @click="handleDeferred">changLoading</button>
    loading: {{ loading }}
</template>
```

## 使用场景

发送请求时往往会加个loading提示用户正在加载，但如果请求响应很快的情况下，loading一闪而过反而用户体验不好，useDeferredFn可以让请求响应很快情况下不显示loading。

<demo />

<script setup>
import demo from './demo.vue'
</script>