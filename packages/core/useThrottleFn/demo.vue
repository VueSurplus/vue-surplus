<script lang="ts" setup>
import { ref } from 'vue';
import { useThrottleFn } from './index'
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