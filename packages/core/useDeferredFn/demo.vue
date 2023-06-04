<script lang="ts" setup>
import { ref } from 'vue';
import { useDeferredFn } from './index'
const loading = ref(false)
const changLoading = () => {
    loading.value = !loading.value
}

const handleDeferred = useDeferredFn(changLoading)


</script>
<template>
    <button @click="handleDeferred">changLoading</button>
    loading: {{ loading }}
</template>
