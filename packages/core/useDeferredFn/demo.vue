<script lang="ts" setup>
import { ref } from 'vue';
import { useDeferredFn } from './index'
const loading = ref(false)
const changLoading = () => {
    loading.value = !loading.value
}

const handleDeferred = useDeferredFn(changLoading,2000)


</script>
<template>
    <button @click="handleDeferred">changLoading</button>
    loading: {{ loading }}
</template>
